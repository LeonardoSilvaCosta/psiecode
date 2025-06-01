import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, PlusCircle } from "lucide-react";

interface AppointmentHeaderProps {
  onNewAppointment: () => void;
  isLoadingPatients: boolean;
  patientsCount: number;
}

export const AppointmentHeader = ({
  onNewAppointment,
  isLoadingPatients,
  patientsCount,
}: AppointmentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-psiecode-dark-blue flex items-center">
          <CalendarDays size={26} className="mr-2.5 text-psiecode-cyan" />
          Agendamentos
        </h1>
        <p className="text-sm text-psiecode-medium-blue mt-1 ml-9">
          Gerencie suas consultas e horários
        </p>
      </div>
      <Button
        onClick={onNewAppointment}
        className="bg-psiecode-cyan hover:bg-psiecode-light-blue text-white shadow-sm hover:shadow-md transition-all"
        disabled={isLoadingPatients || patientsCount === 0}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Novo Agendamento
      </Button>
    </div>
  );
};
