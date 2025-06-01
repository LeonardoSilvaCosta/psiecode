import React from "react";
import { Button } from "@/components/ui/button";
import {
  Edit3,
  Trash2,
  User as UserIcon,
  PlusCircle,
  Clock,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TimeSlot as TimeSlotType, Appointment } from "./types";

interface TimeSlotProps {
  slot: TimeSlotType;
  appointment?: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointmentId: string) => void;
  onNew: (time: string) => void;
  hasPatients: boolean;
}

export const TimeSlot = ({
  slot,
  appointment,
  onEdit,
  onDelete,
  onNew,
  hasPatients,
}: TimeSlotProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch hover:bg-gray-50/80 transition-colors">
      <div className="flex sm:w-24 flex-shrink-0 items-center sm:flex-col sm:items-center justify-start sm:justify-center py-2 sm:py-3 px-3 sm:px-2 border-b sm:border-b-0 sm:border-r border-gray-100 gap-2 sm:gap-0">
        <Clock size={16} className="text-psiecode-medium-blue sm:hidden" />
        <span className="text-sm sm:text-base font-medium text-psiecode-dark-blue">
          {slot.time}
        </span>
        {slot.peak && !appointment && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full border border-amber-100 sm:mt-1 font-medium">
                Popular
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Este é um horário bastante procurado</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex-grow py-2 px-3 flex items-center min-h-[60px] sm:min-h-[72px]">
        {appointment && appointment.tb_patients ? (
          <div className="w-full bg-psiecode-cyan/5 p-2 sm:p-3 rounded-lg border border-psiecode-cyan/20 hover:border-psiecode-cyan/30 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 sm:gap-4">
              <div className="min-w-0">
                <p className="font-medium text-psiecode-dark-blue flex items-center gap-2 mb-1">
                  <UserIcon size={15} className="flex-shrink-0 opacity-70" />
                  <span className="truncate text-sm sm:text-base">
                    {appointment.tb_patients.fullname}
                  </span>
                </p>
                {appointment.notes && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 pl-6">
                    {appointment.notes}
                  </p>
                )}
              </div>
              <div className="flex gap-1 flex-shrink-0 self-end sm:self-start">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 text-psiecode-dark-blue hover:text-psiecode-cyan hover:bg-psiecode-cyan/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(appointment);
                  }}
                >
                  <Edit3 size={13} className="sm:size-[14px]" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(appointment.id);
                  }}
                >
                  <Trash2 size={13} className="sm:size-[14px]" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-full justify-start text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50/50 hover:text-green-700 font-medium text-sm sm:text-base"
            onClick={() => hasPatients && onNew(slot.time)}
            disabled={!hasPatients}
          >
            <PlusCircle size={14} className="mr-2 sm:size-[15px]" /> Disponível
          </Button>
        )}
      </div>
    </div>
  );
};
