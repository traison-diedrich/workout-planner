import { DbResult, supabase } from '../supabase';
import { ClientWorkout } from '../supabase/';

type uid = string | undefined;

export async function readWorkouts(user_id: uid) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${user_id}`);
    const data = await res.json();

    if (res.ok) {
        return data.data as ClientWorkout[];
    }

    throw res.statusText;
}

export async function readWorkout(workout_id: number) {
    const res = await fetch(`http://127.0.0.1:8000/workout/${workout_id}`);
    const data = await res.json();

    if (res.ok) {
        return data.data as ClientWorkout;
    }

    throw res.statusText;
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
