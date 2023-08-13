import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

const temp_uid = '0a2ee282-9aa0-4e5f-8d0a-06025d74d791';

export async function loadWorkouts() {
    const query = supabase.from('workouts').select('*').eq('uid', temp_uid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return res.data;
    }
}

export async function loadExercises(wid: string | undefined) {
    const query = supabase
        .from('exercises')
        .select('*, exercise_types(*)')
        .eq('wid', wid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return res.data;
    }
}
