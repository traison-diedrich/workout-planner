import { ActionFunction, redirect } from 'react-router-dom';
import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

export const signup: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const query = supabase.auth.signUp({
        email: updates.email as string,
        password: updates.password as string,
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        console.error(res.error);
        return redirect('/auth/signup');
    }

    return redirect('/home');
};
