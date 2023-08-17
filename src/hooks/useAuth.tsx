import { Session, User } from '@supabase/supabase-js';
import * as React from 'react';
import { DbResult, supabase } from '../data/supabase';

export interface SessionData {
    user: User | null | undefined;
    session: Session | null;
}

export const useAuth = () => {
    const [session, setSession] = React.useState<SessionData | null>(null);

    return {
        session: session,
        getSession: async () => {
            const query = supabase.auth.getSession();
            const res: DbResult<typeof query> = await query;

            return new Promise<SessionData>((resolve, reject) => {
                if (res.error) {
                    console.error(res.error);
                    reject();
                }

                const fetchedSession = {
                    user: res.data.session?.user,
                    session: res.data.session,
                };
                setSession(fetchedSession);
                resolve(fetchedSession);
            });
        },
        login: async (email: string, password: string) => {
            const query = supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            const res: DbResult<typeof query> = await query;

            return new Promise<SessionData>((resolve, reject) => {
                if (res.error) {
                    console.error(res.error);
                    reject();
                }

                setSession(res.data);
                resolve(res.data);
            });
        },
        logout: async () => {
            const query = supabase.auth.signOut();
            const res: DbResult<typeof query> = await query;

            return new Promise<void>((resolve, reject) => {
                if (res.error) {
                    console.error(res.error);
                    reject();
                }

                setSession(null);
                resolve();
            });
        },
    };
};
