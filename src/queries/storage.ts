import { supabase } from "@/lib/supabaseClient";

export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (uploadError) throw uploadError;
};

export const getFileUrl = async (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
};

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
};
