import { Provider, Session, User } from '@supabase/supabase-js';
import * as React from 'react';
import { DbResult, supabase } from '../data/supabase';

export interface SessionData {
    user: User | null | undefined;
    session: Session | null;
}

async function getSession() {
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

export const useAuth = () => {
    const [session, setSession] = React.useState<SessionData | null>(null);

    React.useEffect(() => {
        getSession()
            .then(session => setSession(session))
            .catch(e => console.error(e));
    }, []);

    // a temporary solution until i can get a reset password page
    // working properly
    React.useEffect(() => {
        supabase.auth.onAuthStateChange(async event => {
            if (event == 'PASSWORD_RECOVERY') {
                const newPassword = prompt(
                    'What would you like your new password to be?',
                );
                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                });

                if (error) alert('There was an error updating your password.');
                if (data) {
                    alert('Password updated successfully!');
                }
            }
        });
    }, []);

    return {
        session: session,
        login: async (email: string, password: string) => {
            const query = supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                throw res.error;
            }
            setSession(res.data);
        },
        loginWith: async (provider: Provider) => {
            const query = supabase.auth.signInWithOAuth({
                provider: provider,
            });
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                throw res.error;
            }
            console.log(res);
        },
        logout: async () => {
            const query = supabase.auth.signOut();
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                throw res.error;
            }

            setSession(null);
        },
        signup: async (email: string, password: string) => {
            const query = supabase.auth.signUp({
                email: email,
                password: password,
            });
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                throw res.error;
            }
        },
    };
};
