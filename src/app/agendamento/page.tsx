"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from "@/utils/toast";
import {
  format,
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  parseISO,
  isValid,
} from "date-fns";
import { PlusCircle, Edit3, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Patient {
  id: string;
  fullname: string;
}

interface Appointment {
  id: string;
  patient_id: string;
  appointment_datetime: string;
  duration_minutes?: number;
  notes?: string;
  tb_patients?: Patient;
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const Agendamento = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<
    Partial<Appointment>
  >({});

  const [selectedPatientId, setSelectedPatientId] = useState<
    string | undefined
  >(undefined);
  const [appointmentTime, setAppointmentTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPatients = useCallback(async () => {
    if (!user) return;
    setIsLoadingPatients(true);
    try {
      const { data, error } = await supabase
        .from("tb_patients")
        .select("id, fullname")
        .eq("user_id", user.id)
        .order("fullname", { ascending: true });

      if (error) throw error;
      setPatients(data || []);
    } catch (error: unknown) {
      let errorMessage = "Erro desconhecido ao buscar pacientes";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError("Erro ao buscar pacientes: " + String(errorMessage));
      setPatients([]);
    } finally {
      setIsLoadingPatients(false);
    }
  }, [user]);

  const fetchAppointments = useCallback(
    async (date: Date) => {
      if (!user || !date) return;
      setIsLoadingAppointments(true);
      try {
        const startDate = format(startOfDay(date), "yyyy-MM-dd'T'HH:mm:ssxxx");
        const endDate = format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ssxxx");

        const { data, error } = await supabase
          .from("tb_appointments")
          .select(
            `
          id, 
          patient_id, 
          appointment_datetime, 
          duration_minutes, 
          notes,
          tb_patients (id, fullname) 
        `
          )
          .eq("user_id", user.id)
          .gte("appointment_datetime", startDate)
          .lte("appointment_datetime", endDate)
          .order("appointment_datetime", { ascending: true });

        if (error) throw error;

        const formattedAppointments =
          data?.map((app) => {
            const patientData = Array.isArray(app.tb_patients)
              ? app.tb_patients[0]
              : app.tb_patients;
            return {
              ...app,
              tb_patients: patientData as Patient | undefined,
            };
          }) || [];

        setAppointments(formattedAppointments as Appointment[]);
      } catch (error: unknown) {
        let errorMessage = "Erro desconhecido ao buscar agendamentos";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        showError("Erro ao buscar agendamentos: " + String(errorMessage));
        setAppointments([]);
      } finally {
        setIsLoadingAppointments(false);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (selectedDate) {
      fetchAppointments(selectedDate);
    }
  }, [selectedDate, fetchAppointments]);

  const handleDateSelect = (date?: Date) => {
    setSelectedDate(date);
  };

  const resetModalForm = () => {
    setSelectedPatientId(undefined);
    setAppointmentTime("09:00");
    setNotes("");
    setCurrentAppointment({});
  };

  const openModalForNew = (time?: string) => {
    resetModalForm();
    if (time) setAppointmentTime(time);
    if (patients.length > 0) {
      setSelectedPatientId(patients[0].id);
    }
    setIsModalOpen(true);
  };

  const openModalForEdit = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setSelectedPatientId(appointment.patient_id);
    setNotes(appointment.notes || "");
    const appTime = parseISO(appointment.appointment_datetime);
    if (isValid(appTime)) {
      setAppointmentTime(format(appTime, "HH:mm"));
    } else {
      setAppointmentTime("09:00");
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !selectedDate || !appointmentTime || !selectedPatientId) {
      showError("Dados incompletos para salvar agendamento.");
      return;
    }
    setIsSubmitting(true);
    const toastId = showLoading("Salvando agendamento...");

    const [hours, minutes] = appointmentTime.split(":").map(Number);
    const appointment_datetime = setMinutes(
      setHours(startOfDay(selectedDate), hours),
      minutes
    );

    const appointmentData = {
      user_id: user.id,
      patient_id: selectedPatientId,
      appointment_datetime: appointment_datetime.toISOString(),
      notes: notes,
    };

    try {
      let error;
      if (currentAppointment.id) {
        const { error: updateError } = await supabase
          .from("tb_appointments")
          .update(appointmentData)
          .eq("id", currentAppointment.id)
          .eq("user_id", user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("tb_appointments")
          .insert(appointmentData);
        error = insertError;
      }

      dismissToast(toastId);
      if (error) throw error;

      showSuccess(
        `Agendamento ${
          currentAppointment.id ? "atualizado" : "criado"
        } com sucesso!`
      );
      setIsModalOpen(false);
      fetchAppointments(selectedDate);
    } catch (error: unknown) {
      dismissToast(toastId);
      let errorMessage = "Erro desconhecido ao salvar agendamento";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError("Erro ao salvar agendamento: " + String(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!user || !confirm("Tem certeza que deseja excluir este agendamento?"))
      return;
    const toastId = showLoading("Excluindo agendamento...");
    try {
      const { error } = await supabase
        .from("tb_appointments")
        .delete()
        .eq("id", appointmentId)
        .eq("user_id", user.id);
      dismissToast(toastId);
      if (error) throw error;
      showSuccess("Agendamento excluído com sucesso!");
      if (selectedDate) fetchAppointments(selectedDate);
    } catch (error: unknown) {
      dismissToast(toastId);
      let errorMessage = "Erro desconhecido ao excluir agendamento";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError("Erro ao excluir agendamento: " + String(errorMessage));
    }
  };

  const getAppointmentForSlot = (time: string): Appointment | undefined => {
    if (!selectedDate) return undefined;
    return appointments.find((app) => {
      const appDateTime = parseISO(app.appointment_datetime);
      return isValid(appDateTime) && format(appDateTime, "HH:mm") === time;
    });
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft size={18} className="mr-2" /> Voltar para Dashboard
      </Button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold text-psiecode-dark-blue mb-4">
            Selecione a Data
          </h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border shadow"
            disabled={(date: Date) => date < startOfDay(new Date())}
          />
          <Button
            onClick={() => openModalForNew()}
            className="w-full mt-4 bg-psiecode-cyan hover:bg-psiecode-light-blue"
            disabled={isLoadingPatients || patients.length === 0}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Agendamento
          </Button>
          {patients.length === 0 && !isLoadingPatients && (
            <p className="text-sm text-red-600 mt-2">
              Você precisa cadastrar pacientes antes de criar agendamentos.{" "}
              <Link href="/pacientes" className="underline">
                Cadastrar Paciente
              </Link>
            </p>
          )}
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold text-psiecode-dark-blue mb-4">
            Horários para{" "}
            {selectedDate
              ? format(selectedDate, "dd/MM/yyyy")
              : "Nenhuma data selecionada"}
          </h2>
          {isLoadingAppointments && <p>Carregando agendamentos...</p>}
          {!isLoadingAppointments && selectedDate && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const appointment = getAppointmentForSlot(time);
                return (
                  <div
                    key={time}
                    className={`p-3 rounded-md border text-center transition-all
                    ${
                      appointment
                        ? "bg-psiecode-medium-blue/20 border-psiecode-medium-blue"
                        : "bg-green-500/10 border-green-500 hover:bg-green-500/20 cursor-pointer"
                    }`}
                    onClick={() =>
                      !appointment &&
                      patients.length > 0 &&
                      openModalForNew(time)
                    }
                  >
                    <p className="font-semibold text-lg text-psiecode-dark-blue">
                      {time}
                    </p>
                    {appointment && appointment.tb_patients ? (
                      <>
                        <p
                          className="text-sm text-psiecode-dark-blue truncate"
                          title={appointment.tb_patients.fullname}
                        >
                          {appointment.tb_patients.fullname}
                        </p>
                        <div className="mt-1 flex justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-psiecode-dark-blue hover:text-psiecode-cyan"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModalForEdit(appointment);
                            }}
                          >
                            <Edit3 size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAppointment(appointment.id);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    ) : !appointment ? (
                      <p className="text-sm text-green-700">Disponível</p>
                    ) : (
                      <p className="text-sm text-gray-500">Carregando...</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {!isLoadingAppointments &&
            appointments.length === 0 &&
            timeSlots.every((time) => !getAppointmentForSlot(time)) &&
            selectedDate && (
              <p className="text-psiecode-medium-blue mt-4">
                Nenhum agendamento para este dia.
              </p>
            )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentAppointment.id
                ? "Editar Agendamento"
                : "Novo Agendamento"}
            </DialogTitle>
            <DialogDescription>
              {currentAppointment.id
                ? "Atualize os detalhes abaixo."
                : `Preencha os detalhes para o novo agendamento em ${
                    selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
                  } às ${appointmentTime}.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patientId" className="text-right col-span-1">
                  Paciente
                </Label>
                <Select
                  value={selectedPatientId}
                  onValueChange={setSelectedPatientId}
                  disabled={isSubmitting || isLoadingPatients}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={
                        isLoadingPatients
                          ? "Carregando..."
                          : "Selecione um paciente"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.fullname}
                      </SelectItem>
                    ))}
                    {patients.length === 0 && !isLoadingPatients && (
                      <SelectItem value="no-patients" disabled>
                        Nenhum paciente cadastrado
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="appointmentTimeModal"
                  className="text-right col-span-1"
                >
                  Horário
                </Label>
                <Input
                  id="appointmentTimeModal"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="col-span-3"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="notesModal"
                  className="text-right col-span-1 align-top pt-2"
                >
                  Notas
                </Label>
                <Textarea
                  id="notesModal"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="col-span-3"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
                disabled={
                  isSubmitting || !selectedPatientId || isLoadingPatients
                }
              >
                {isSubmitting
                  ? currentAppointment.id
                    ? "Salvando..."
                    : "Criando..."
                  : currentAppointment.id
                  ? "Salvar Alterações"
                  : "Criar Agendamento"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Agendamento;
