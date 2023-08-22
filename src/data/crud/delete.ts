import { DbResult } from '../supabase/database.types';
import { supabase } from '../supabase/supabaseClient';

export async function deleteWorkout(wid: number) {
    const query = supabase.from('workouts').delete().eq('id', wid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return;
}

export async function deleteExercise(eid: number) {
    const query = supabase.from('exercises').delete().eq('id', eid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return;
}
