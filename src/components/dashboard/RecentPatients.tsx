import { DashboardCard } from "./DashboardCard";

export const RecentPatients = () => {
  return (
    <DashboardCard
      title="Pacientes Recentes"
      linkHref="/pacientes"
      linkText="Ver Pacientes"
    >
      {/* Lista de pacientes recentes aqui */}
      <p className="text-sm text-gray-500">Carregando pacientes...</p>
    </DashboardCard>
  );
};
