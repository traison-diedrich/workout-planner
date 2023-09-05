import { DbResult, supabase } from '../supabase';

type uid = string | undefined;

export async function readWorkouts(uid: uid) {
    const query = supabase
        .from('workouts')
        .select('*')
        .eq('uid', uid)
        .order('id', { ascending: true });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}

export async function readWorkout(wid: number) {
    const query = supabase.from('workouts').select('*').eq('id', wid).single();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}

export async function readExercises(wid: number) {
    const query = supabase
        .from('exercises')
        .select('*')
        .eq('wid', wid)
        .order('exercise_order', { ascending: true });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}

export async function readExercise(eid: number) {
    const query = supabase.from('exercises').select('*').eq('id', eid).single();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}

export async function readExerciseInfo() {
    const query = supabase.from('exercise_types').select('*');
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}
