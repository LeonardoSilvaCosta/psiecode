import React from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, User as UserIcon, PlusCircle } from "lucide-react";
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
    <div className="flex items-stretch hover:bg-gray-50/80 transition-colors">
      <div className="w-24 flex-shrink-0 flex flex-col items-center justify-center py-3 px-2 border-r border-gray-100">
        <span className="text-base font-medium text-psiecode-dark-blue">
          {slot.time}
        </span>
        {slot.peak && !appointment && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] rounded-full border border-amber-100 mt-1 font-medium">
                Popular
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Este é um horário bastante procurado</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex-grow py-2 px-3 flex items-center min-h-[72px]">
        {appointment && appointment.tb_patients ? (
          <div className="w-full bg-psiecode-cyan/5 p-3 rounded-lg border border-psiecode-cyan/20 hover:border-psiecode-cyan/30 transition-colors">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="font-medium text-psiecode-dark-blue flex items-center gap-2 mb-1">
                  <UserIcon size={15} className="flex-shrink-0 opacity-70" />
                  <span className="truncate">
                    {appointment.tb_patients.fullname}
                  </span>
                </p>
                {appointment.notes && (
                  <p className="text-sm text-gray-600 line-clamp-2 pl-6">
                    {appointment.notes}
                  </p>
                )}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-psiecode-dark-blue hover:text-psiecode-cyan hover:bg-psiecode-cyan/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(appointment);
                  }}
                >
                  <Edit3 size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(appointment.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-full justify-start text-green-600 border-green-200 hover:border-green-300 hover:bg-green-50/50 hover:text-green-700 font-medium"
            onClick={() => hasPatients && onNew(slot.time)}
            disabled={!hasPatients}
          >
            <PlusCircle size={15} className="mr-2" /> Disponível
          </Button>
        )}
      </div>
    </div>
  );
};
