import {
    DbResult,
    ExerciseInfoType,
    ExerciseType,
    WorkoutType,
    supabase,
} from '../supabase';

type uid = string | undefined;

export async function readWorkouts(uid: uid) {
    const query = supabase.from('workouts').select('*').eq('uid', uid);
    const res: DbResult<typeof query> = await query;

    return new Promise<WorkoutType[] | null>((resolve, reject) => {
        if (res.error) {
            reject(res.error);
        }
        resolve(res.data);
    });
}

export async function readExercises(wid: string) {
    const query = supabase.from('exercises').select('*').eq('wid', wid);
    const res: DbResult<typeof query> = await query;

    return new Promise<ExerciseType[] | null>((resolve, reject) => {
        if (res.error) {
            console.error(res.error);
            reject(res.error);
        }
        resolve(res.data);
    });
}

export async function readExerciseInfo() {
    const query = supabase.from('exercise_types').select('*');
    const res: DbResult<typeof query> = await query;

    return new Promise<ExerciseInfoType[] | null>((resolve, reject) => {
        if (res.error) {
            reject(res.error);
        }
        resolve(res.data);
    });
}
