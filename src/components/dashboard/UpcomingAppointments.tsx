import { DashboardCard } from "./DashboardCard";

export const UpcomingAppointments = () => {
  return (
    <DashboardCard
      title="Próximas Consultas"
      linkHref="/agendamento"
      linkText="Ver Agenda"
    >
      {/* Lista de próximas consultas aqui */}
      <p className="text-sm text-gray-500">Carregando consultas...</p>
    </DashboardCard>
  );
};
