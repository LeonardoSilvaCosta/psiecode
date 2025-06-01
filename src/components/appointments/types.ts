export interface Patient {
  id: string;
  fullname: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  appointment_datetime: string;
  duration_minutes?: number;
  notes?: string;
  tb_patients?: Patient;
}

export interface TimeSlot {
  time: string;
  period: "morning" | "afternoon" | "evening";
  peak?: boolean;
}

export interface PeriodLabels {
  [key: string]: string;
}
