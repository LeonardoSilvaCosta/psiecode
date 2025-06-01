"use client";

import { useAuth } from "@/contexts/AuthContext";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentPatients } from "@/components/dashboard/RecentPatients";

const Dashboard = () => {
  const { user } = useAuth();

  // TODO: Fetch real data from Supabase
  const statsData = {
    todayAppointments: 5,
    weekAppointments: 23,
    activePatients: 42,
    newPatients: 7,
  };

  return (
    <div className="container mx-auto p-6">
      <WelcomeHeader user={user} />
      <StatsGrid data={statsData} />

      <div className="grid md:grid-cols-2 gap-6">
        <UpcomingAppointments />
        <RecentPatients />
      </div>
    </div>
  );
};

export default Dashboard;
