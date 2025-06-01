import { supabase } from "@/lib/supabaseClient";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export const sendContactMessage = async (message: ContactMessage) => {
  const { error } = await supabase.from("tb_contact_messages").insert(message);

  if (error) throw error;
};
