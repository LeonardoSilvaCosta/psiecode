import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface CustomCalendarProps {
  selected?: Date;
  onSelect: (date?: Date) => void;
  disabled?: (date: Date) => boolean;
}

export const CustomCalendar = ({
  selected,
  onSelect,
  disabled,
}: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start, end });

    // Get the day of the week for the first day (0-6)
    const firstDayOfWeek = getDay(start);

    // Add empty days at the start
    const prefixDays = Array(firstDayOfWeek).fill(null);

    // Calculate how many days we need to add at the end to complete the grid
    const totalDays = prefixDays.length + daysInMonth.length;
    const suffixDays = Array(42 - totalDays).fill(null);

    return [...prefixDays, ...daysInMonth, ...suffixDays];
  }, [currentMonth]);

  const handlePreviousMonth = () =>
    setCurrentMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  const isDateDisabled = (date: Date) => {
    if (!date) return true;
    if (disabled) return disabled(date);
    return false;
  };

  return (
    <div className="p-3">
      {/* Header with month and navigation */}
      <div className="relative flex items-center justify-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="absolute left-0 p-1 text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors"
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-base font-medium text-psiecode-dark-blue">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="absolute right-0 p-1 text-psiecode-medium-blue hover:text-psiecode-dark-blue transition-colors"
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-lg overflow-hidden">
        {/* Weekday headers */}
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="bg-white p-2 text-[11px] font-medium text-psiecode-medium-blue text-center uppercase"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((date, idx) => {
          if (!date) {
            return (
              <div
                key={`empty-${idx}`}
                className="bg-white aspect-square p-1"
              />
            );
          }

          const isSelected = selected && isSameDay(date, selected);
          const isToday = isSameDay(date, new Date());
          const isOutsideMonth = !isSameMonth(date, currentMonth);
          const isDisabled = isDateDisabled(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => !isDisabled && onSelect(date)}
              disabled={isDisabled}
              className={`
                bg-white aspect-square p-1 relative group
                ${
                  isDisabled
                    ? "cursor-not-allowed"
                    : "hover:bg-psiecode-cyan/5 cursor-pointer"
                }
                ${isSelected ? "bg-psiecode-cyan/10" : ""}
                ${
                  isToday && !isSelected
                    ? "bg-psiecode-light-blue/10 font-medium ring-1 ring-psiecode-light-blue/30"
                    : ""
                }
                ${isOutsideMonth && !isSelected ? "text-gray-400" : ""}
              `}
            >
              <time
                dateTime={format(date, "yyyy-MM-dd")}
                className={`
                  flex items-center justify-center w-full h-full text-sm rounded-full
                  ${
                    isSelected
                      ? "bg-psiecode-cyan text-white font-semibold shadow-sm"
                      : ""
                  }
                  ${isDisabled ? "text-gray-300" : ""}
                `}
              >
                {format(date, "d")}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
};
