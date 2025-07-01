import { supabase } from '../lib/supabase';
import type { Rental } from '../types';

export const rentalService = {
  async getAll() {
    const { data, error } = await supabase
      .from('rentals')
      .select(`
        *,
        equipment(*),
        user:user_id(*)
      `);

    if (error) throw error;
    return data;
  },

  async create(rental: Omit<Rental, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('rentals')
      .insert(rental)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: 'approved' | 'rejected') {
    const { data, error } = await supabase
      .from('rentals')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};