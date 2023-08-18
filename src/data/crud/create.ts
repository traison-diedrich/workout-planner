import { DbResult } from '../supabase/database.types';
import { supabase } from '../supabase/supabaseClient';

type uid = string | undefined;

export async function createWorkout(uid: uid) {
    const query = supabase
        .from('workouts')
        .insert([{ uid: uid, name: 'New Workout' }])
        .select();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data[0];
}
