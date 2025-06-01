"use client";

import { useAuth } from "@/contexts/AuthContext";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { UserMenu } from "@/components/navbar/UserMenu";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  // TODO: Fetch real data from Supabase
  const statsData = {
    todayAppointments: 5,
    weekAppointments: 23,
    activePatients: 42,
    newPatients: 7,
  };

  const userDisplayName = user?.email?.split("@")[0] || "Usuário";
  const userFallbackName = userDisplayName.slice(0, 2).toUpperCase();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end mb-6">
        <UserMenu
          user={user}
          userDisplayName={userDisplayName}
          userFallbackName={userFallbackName}
          onSignOut={signOut}
        />
      </div>
      <StatsGrid data={statsData} />

      <div className="grid md:grid-cols-2 gap-6">
        <UpcomingAppointments />
        <RecentPatients />
      </div>
    </div>
  );
};

export default Dashboard;
