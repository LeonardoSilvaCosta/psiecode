import { supabase } from "@/lib/supabaseClient";
import type { Patient } from "@/components/appointments/types";

export const fetchPatients = async (userId: string): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from("tb_patients")
    .select("id, fullname")
    .eq("user_id", userId)
    .order("fullname", { ascending: true });

  if (error) throw error;
  return data || [];
};
