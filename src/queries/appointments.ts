import { supabase } from "@/lib/supabaseClient";
import { format, startOfDay, endOfDay } from "date-fns";
import type { Appointment } from "@/components/appointments/types";

export const fetchAppointmentsByDate = async (userId: string, date: Date) => {
  const startDate = format(startOfDay(date), "yyyy-MM-dd'T'HH:mm:ssxxx");
  const endDate = format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ssxxx");

  const { data, error } = await supabase
    .from("tb_appointments")
    .select(
      `
      id, 
      patient_id, 
      appointment_datetime, 
      duration_minutes, 
      notes,
      tb_patients (id, fullname) 
    `
    )
    .eq("user_id", userId)
    .gte("appointment_datetime", startDate)
    .lte("appointment_datetime", endDate)
    .order("appointment_datetime", { ascending: true });

  if (error) throw error;

  return (data?.map((app) => {
    const patientData = Array.isArray(app.tb_patients)
      ? app.tb_patients[0]
      : app.tb_patients;
    return {
      ...app,
      tb_patients: patientData,
    };
  }) || []) as Appointment[];
};

export const createAppointment = async (appointmentData: {
  user_id: string;
  patient_id: string;
  appointment_datetime: string;
  notes?: string;
}) => {
  const { error } = await supabase
    .from("tb_appointments")
    .insert(appointmentData);

  if (error) throw error;
};

export const updateAppointment = async (
  appointmentId: string,
  userId: string,
  appointmentData: {
    patient_id: string;
    appointment_datetime: string;
    notes?: string;
  }
) => {
  const { error } = await supabase
    .from("tb_appointments")
    .update(appointmentData)
    .eq("id", appointmentId)
    .eq("user_id", userId);

  if (error) throw error;
};

export const deleteAppointment = async (
  appointmentId: string,
  userId: string
) => {
  const { error } = await supabase
    .from("tb_appointments")
    .delete()
    .eq("id", appointmentId)
    .eq("user_id", userId);

  if (error) throw error;
};
