import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import type { Patient, Appointment } from "./types";

interface AppointmentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentAppointment: Partial<Appointment>;
  selectedDate?: Date;
  appointmentTime: string;
  patients: Patient[];
  isLoadingPatients: boolean;
  selectedPatientId?: string;
  onPatientSelect: (patientId: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  onTimeChange: (time: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AppointmentModal = ({
  isOpen,
  onOpenChange,
  currentAppointment,
  selectedDate,
  appointmentTime,
  patients,
  isLoadingPatients,
  selectedPatientId,
  onPatientSelect,
  notes,
  onNotesChange,
  onTimeChange,
  isSubmitting,
  onSubmit,
}: AppointmentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-psiecode-dark-blue">
            {currentAppointment.id ? "Editar Agendamento" : "Novo Agendamento"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-psiecode-medium-blue">
            {currentAppointment.id
              ? "Atualize os detalhes do agendamento abaixo."
              : `Agende uma nova consulta para ${
                  selectedDate
                    ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                    : ""
                } às ${appointmentTime}.`}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="space-y-4 sm:space-y-5 py-3 sm:py-4"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label
                htmlFor="patientId"
                className="text-sm font-medium text-psiecode-dark-blue"
              >
                Paciente
              </Label>
              <Select
                value={selectedPatientId}
                onValueChange={onPatientSelect}
                disabled={isSubmitting || isLoadingPatients}
              >
                <SelectTrigger className="mt-1 sm:mt-1.5 w-full bg-white text-sm sm:text-base">
                  <SelectValue
                    placeholder={
                      isLoadingPatients
                        ? "Carregando pacientes..."
                        : "Selecione o paciente"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem
                      key={p.id}
                      value={p.id}
                      className="text-sm sm:text-base"
                    >
                      {p.fullname}
                    </SelectItem>
                  ))}
                  {patients.length === 0 && !isLoadingPatients && (
                    <SelectItem
                      value="no-patients"
                      disabled
                      className="text-sm sm:text-base"
                    >
                      Nenhum paciente cadastrado.
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {patients.length === 0 && !isLoadingPatients && (
                <p className="text-xs text-red-500 mt-1.5">
                  Primeiro,{" "}
                  <Link
                    href="/pacientes"
                    className="underline hover:text-red-600"
                  >
                    cadastre um paciente
                  </Link>
                  .
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="appointmentTimeModal"
                className="text-sm font-medium text-psiecode-dark-blue"
              >
                Horário da Consulta
              </Label>
              <Input
                id="appointmentTimeModal"
                type="time"
                value={appointmentTime}
                onChange={(e) => onTimeChange(e.target.value)}
                className="mt-1 sm:mt-1.5 w-full bg-white text-sm sm:text-base"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label
                htmlFor="notesModal"
                className="text-sm font-medium text-psiecode-dark-blue flex items-center justify-between"
              >
                <span>Observações</span>
                <span className="text-xs text-gray-500 font-normal">
                  Opcional
                </span>
              </Label>
              <Textarea
                id="notesModal"
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                className="mt-1 sm:mt-1.5 w-full bg-white min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                placeholder="Adicione observações relevantes sobre a consulta..."
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 sm:pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none text-sm sm:text-base"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-psiecode-cyan hover:bg-psiecode-light-blue text-white shadow-sm hover:shadow-md transition-all flex-1 sm:flex-none min-w-[120px] sm:min-w-[140px] text-sm sm:text-base"
              disabled={isSubmitting || !selectedPatientId || isLoadingPatients}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-r-transparent mr-2" />
                  Salvando...
                </>
              ) : currentAppointment.id ? (
                "Salvar Alterações"
              ) : (
                "Criar Agendamento"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
