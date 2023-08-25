import { Provider } from '@supabase/supabase-js';
import { DbResult, supabase } from '../supabase';

export async function getSession() {
    const query = supabase.auth.getSession();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }

    return res.data;
}

export async function login(email: string, password: string) {
    const query = supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
    return res.data;
}

export async function loginWith(provider: Provider, route: string) {
    const redirect = window.location.origin + route;
    console.log(redirect);

    const query = supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: redirect,
        },
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
}

export async function sendPasswordResetEmail(email: string) {
    const redirect = window.location.origin + '/access/login';

    const query = supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirect,
    });

    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
}

export async function resetPassword(password: string) {
    const query = supabase.auth.updateUser({
        password: password,
    });
    const { error } = await query;

    if (error) {
        throw error;
    }
}

export async function logout() {
    const query = supabase.auth.signOut();
    const { error } = await query;

    if (error) {
        throw error;
    }
}

export async function signup(email: string, password: string) {
    const query = supabase.auth.signUp({
        email: email,
        password: password,
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
}
