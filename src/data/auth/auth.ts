import { Provider } from '@supabase/supabase-js';
import { DbResult, supabase } from '../supabase';

export async function getSession() {
    const query = supabase.auth.getSession();
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }

    const fetchedSession = {
        user: res.data.session?.user,
        session: res.data.session,
    };
    return fetchedSession;
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

export async function loginWith(provider: Provider) {
    const query = supabase.auth.signInWithOAuth({
        provider: provider,
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
}

//supabase logout
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
