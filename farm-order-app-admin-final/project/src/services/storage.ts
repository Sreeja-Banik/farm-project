import { supabase } from '../lib/supabase';

export const storageService = {
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('equipment-images')
      .upload(path, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('equipment-images')
      .getPublicUrl(data.path);

    return publicUrl;
  },

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('equipment-images')
      .remove([path]);

    if (error) throw error;
  }
};