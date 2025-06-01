"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { showError, showSuccess } from "@/utils/toast";
import {
  format,
  startOfDay,
  setHours,
  setMinutes,
  parseISO,
  isValid,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, PlusCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { CustomCalendar as Calendar } from "@/components/calendar/CustomCalendar";
import { AppointmentModal } from "@/components/appointments/AppointmentModal";
import { TimeSlot } from "@/components/appointments/TimeSlot";
import { AppointmentHeader } from "@/components/appointments/AppointmentHeader";
import type {
  TimeSlot as TimeSlotType,
  PeriodLabels,
  Patient,
  Appointment,
} from "@/components/appointments/types";
import {
  fetchAppointmentsByDate,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  fetchPatients,
} from "@/queries";

const timeSlots: TimeSlotType[] = [
  { time: "07:00", period: "morning" },
  { time: "08:00", period: "morning" },
  { time: "09:00", period: "morning" },
  { time: "10:00", period: "morning", peak: true },
  { time: "11:00", period: "morning", peak: true },
  { time: "12:00", period: "afternoon" },
  { time: "13:00", period: "afternoon" },
  { time: "14:00", period: "afternoon", peak: true },
  { time: "15:00", period: "afternoon", peak: true },
  { time: "16:00", period: "afternoon" },
  { time: "17:00", period: "afternoon" },
  { time: "18:00", period: "evening" },
  { time: "19:00", period: "evening", peak: true },
  { time: "20:00", period: "evening", peak: true },
  { time: "21:00", period: "evening" },
  { time: "22:00", period: "evening" },
];

const periodLabels: PeriodLabels = {
  morning: "Manhã",
  afternoon: "Tarde",
  evening: "Noite",
};

const Agendamento = () => {
  const { user } = useAuth();
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

  const fetchPatientsData = useCallback(async () => {
    if (!user) return;
    setIsLoadingPatients(true);
    try {
      const data = await fetchPatients(user.id);
      setPatients(data);
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

  const fetchAppointmentsData = useCallback(
    async (date: Date) => {
      if (!user || !date) return;
      setIsLoadingAppointments(true);
      try {
        const data = await fetchAppointmentsByDate(user.id, date);
        setAppointments(data);
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
    fetchPatientsData();
  }, [fetchPatientsData]);

  useEffect(() => {
    if (selectedDate) {
      fetchAppointmentsData(selectedDate);
    }
  }, [selectedDate, fetchAppointmentsData]);

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
    if (patients.length > 0 && patients[0]?.id) {
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
    showSuccess("Salvando agendamento...");

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
      if (currentAppointment.id) {
        await updateAppointment(currentAppointment.id, user.id, {
          patient_id: appointmentData.patient_id,
          appointment_datetime: appointmentData.appointment_datetime,
          notes: appointmentData.notes,
        });
      } else {
        await createAppointment(appointmentData);
      }

      showSuccess(
        `Agendamento ${
          currentAppointment.id ? "atualizado" : "criado"
        } com sucesso!`
      );
      setIsModalOpen(false);
      if (selectedDate) fetchAppointmentsData(selectedDate);
    } catch (error: unknown) {
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
    showSuccess("Excluindo agendamento...");
    try {
      await deleteAppointment(appointmentId, user.id);
      showSuccess("Agendamento excluído com sucesso!");
      if (selectedDate) fetchAppointmentsData(selectedDate);
    } catch (error: unknown) {
      let errorMessage = "Erro desconhecido ao excluir agendamento";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError("Erro ao excluir agendamento: " + String(errorMessage));
    }
  };

  const getAppointmentForSlot = (
    slot: TimeSlotType | string
  ): Appointment | undefined => {
    if (!selectedDate) return undefined;
    const time = typeof slot === "string" ? slot : slot.time;
    return appointments.find((app) => {
      const appDateTime = parseISO(app.appointment_datetime);
      return isValid(appDateTime) && format(appDateTime, "HH:mm") === time;
    });
  };

  const renderTimeSlots = () => {
    let currentPeriod = "";

    return timeSlots.map((slot) => {
      const appointment = getAppointmentForSlot(slot);
      const showPeriodHeader = slot.period !== currentPeriod;
      currentPeriod = slot.period;

      return (
        <React.Fragment key={`slot-${slot.time}`}>
          {showPeriodHeader && (
            <div className="col-span-full mt-6 first:mt-0 mb-3">
              <h3 className="text-md font-semibold text-psiecode-dark-blue flex items-center gap-2 px-4">
                {periodLabels[slot.period]}
              </h3>
              <hr className="my-2 border-gray-100" />
            </div>
          )}
          <TimeSlot
            slot={slot}
            appointment={appointment}
            onEdit={openModalForEdit}
            onDelete={handleDeleteAppointment}
            onNew={openModalForNew}
            hasPatients={patients.length > 0}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-psiecode-medium-blue hover:text-psiecode-dark-blue self-start"
              asChild
            >
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="ml-2">Voltar</span>
              </Link>
            </Button>
          </div>

          <AppointmentHeader
            onNewAppointment={() => openModalForNew()}
            isLoadingPatients={isLoadingPatients}
            patientsCount={patients.length}
          />

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Calendar Column */}
              <div className="md:col-span-4 lg:col-span-3 p-3 sm:p-4">
                <div className="md:sticky md:top-6">
                  <div className="rounded-lg border border-gray-100 w-full bg-white shadow-sm">
                    <Calendar
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date: Date) => date < startOfDay(new Date())}
                    />
                  </div>

                  {/* Alert - No Patients */}
                  {patients.length === 0 && !isLoadingPatients && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-center">
                      <p className="text-sm text-red-600 font-medium">
                        Você precisa cadastrar pacientes antes de criar
                        agendamentos.
                      </p>
                      <Button
                        variant="link"
                        className="h-auto p-0 mt-1 text-red-600 text-sm font-medium"
                        asChild
                      >
                        <Link href="/pacientes">Cadastrar Paciente</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule Column */}
              <div className="md:col-span-8 lg:col-span-9 p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-psiecode-dark-blue">
                    Horários para{" "}
                    <span className="text-psiecode-cyan block sm:inline mt-1 sm:mt-0">
                      {selectedDate
                        ? format(selectedDate, "EEEE, dd 'de' MMMM", {
                            locale: ptBR,
                          })
                        : "Nenhuma data selecionada"}
                    </span>
                  </h2>
                </div>

                {isLoadingAppointments ? (
                  <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[calc(100vh-16rem)]">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-psiecode-cyan border-r-transparent"></div>
                    <p className="ml-3 text-psiecode-medium-blue text-sm">
                      Carregando horários...
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-100 rounded-lg divide-y divide-gray-50 bg-white overflow-x-auto">
                    {renderTimeSlots()}
                  </div>
                )}

                {!isLoadingAppointments &&
                  appointments.length === 0 &&
                  timeSlots.every((slot) => !getAppointmentForSlot(slot)) &&
                  selectedDate && (
                    <div className="text-center py-8 sm:py-12 text-psiecode-medium-blue">
                      <CalendarDays
                        size={32}
                        className="mx-auto opacity-50 mb-3"
                      />
                      <p className="text-sm sm:text-base mb-1 font-medium">
                        Nenhum agendamento para este dia
                      </p>
                      <p className="text-xs sm:text-sm mb-4 text-gray-500">
                        Selecione um horário disponível para marcar uma consulta
                      </p>
                      <Button
                        onClick={() => openModalForNew()}
                        className="bg-psiecode-cyan hover:bg-psiecode-light-blue text-white shadow-sm hover:shadow-md transition-all text-sm sm:text-base"
                        disabled={isLoadingPatients || patients.length === 0}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" /> Agendar Consulta
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <AppointmentModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          currentAppointment={currentAppointment}
          selectedDate={selectedDate}
          appointmentTime={appointmentTime}
          patients={patients}
          isLoadingPatients={isLoadingPatients}
          selectedPatientId={selectedPatientId}
          onPatientSelect={setSelectedPatientId}
          notes={notes}
          onNotesChange={setNotes}
          onTimeChange={setAppointmentTime}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
        />
      </div>
    </TooltipProvider>
  );
};

export default Agendamento;
