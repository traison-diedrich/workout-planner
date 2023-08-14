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
    wid: string;
}

export const loadExercises: LoaderFunction = async ({ params }) => {
    const typedParams = params as unknown as exerciseParams;
    const query = supabase
        .from('exercises')
        .select('*, exercise_types(*)')
        .eq('wid', typedParams.wid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return res.data;
    }
};
