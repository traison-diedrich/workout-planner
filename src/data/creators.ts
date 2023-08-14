import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

const temp_uid = '0a2ee282-9aa0-4e5f-8d0a-06025d74d791';

export async function createWorkout() {
    const query = supabase
        .from('workouts')
        .insert([{ uid: temp_uid, name: 'New Workout' }])
        .select();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return res.data;
    }
}
