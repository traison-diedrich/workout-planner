import { LoaderFunction } from 'react-router-dom';
import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

const temp_uid = '0a2ee282-9aa0-4e5f-8d0a-06025d74d791';

export const loadWorkouts: LoaderFunction = async () => {
    const query = supabase.from('workouts').select('*').eq('uid', temp_uid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return res.data;
    }
};

interface exerciseParams {
    wid: number;
}

export const loadExercises: LoaderFunction = async ({ params }) => {
    const typedParams = params as unknown as exerciseParams;
    const exerciseQuery = supabase
        .from('exercises')
        .select('*')
        .eq('wid', typedParams.wid);
    const exercises: DbResult<typeof exerciseQuery> = await exerciseQuery;

    const typesQuery = supabase.from('exercise_types').select('*');
    const types: DbResult<typeof typesQuery> = await typesQuery;

    if (exercises.error || types.error) {
        console.error(exercises.error || types.error);
    } else {
        return { initialExercises: exercises.data, options: types.data };
    }
};
