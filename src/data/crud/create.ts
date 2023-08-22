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

export async function createExercise(wid: number) {
    const query = supabase
        .from('exercises')
        .insert([{ e_type_id: 1, wid: wid, sets: 3, reps: 10 }])
        .select();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data[0];
}
