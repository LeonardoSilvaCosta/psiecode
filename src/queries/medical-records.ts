import { supabase } from "@/lib/supabaseClient";

interface MedicalRecord {
  id: string;
  patient_id: string;
  consultation_date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  created_at: string;
}

export const fetchMedicalRecords = async (
  patientId: string,
  userId: string
) => {
  const { data, error } = await supabase
    .from("tb_medical_records")
    .select("*")
    .eq("patient_id", patientId)
    .eq("user_id", userId)
    .order("consultation_date", { ascending: false });

  if (error) throw error;
  return data as MedicalRecord[];
};

export const createMedicalRecord = async (
  record: Omit<MedicalRecord, "id" | "created_at"> & { user_id: string }
) => {
  const { error } = await supabase.from("tb_medical_records").insert(record);

  if (error) throw error;
};

export const updateMedicalRecord = async (
  recordId: string,
  userId: string,
  updates: Partial<Omit<MedicalRecord, "id" | "created_at" | "patient_id">>
) => {
  const { error } = await supabase
    .from("tb_medical_records")
    .update(updates)
    .eq("id", recordId)
    .eq("user_id", userId);

  if (error) throw error;
};

export const deleteMedicalRecord = async (recordId: string, userId: string) => {
  const { error } = await supabase
    .from("tb_medical_records")
    .delete()
    .eq("id", recordId)
    .eq("user_id", userId);

  if (error) throw error;
};
