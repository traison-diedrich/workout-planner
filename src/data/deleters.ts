import { ActionFunction, redirect } from 'react-router-dom';
import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

export const deleteWorkout: ActionFunction = async ({ params }) => {
    const query = supabase.from('workouts').delete().eq('id', params.wid);
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
    } else {
        return redirect('/auth/workouts');
    }
};
