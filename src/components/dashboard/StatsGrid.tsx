import { Clock, Calendar, UserCheck, UserPlus } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsData {
  todayAppointments: number;
  weekAppointments: number;
  activePatients: number;
  newPatients: number;
}

interface StatsGridProps {
  data: StatsData;
}

export const StatsGrid = ({ data }: StatsGridProps) => {
  const stats = [
    {
      title: "Consultas Hoje",
      value: data.todayAppointments,
      icon: Clock,
    },
    {
      title: "Consultas esta Semana",
      value: data.weekAppointments,
      icon: Calendar,
    },
    {
      title: "Pacientes Ativos",
      value: data.activePatients,
      icon: UserCheck,
    },
    {
      title: "Novos Pacientes",
      value: data.newPatients,
      icon: UserPlus,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};
