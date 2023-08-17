import { Session, User } from '@supabase/supabase-js';
import * as React from 'react';
import { DbResult } from '../data/database.types';
import { supabase } from '../data/supabaseClient';

interface SessionData {
    user: User | null;
    session: Session | null;
}

interface Auth {
    session: SessionData | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const defaultAuthValue: Auth = {
    session: null,
    login: async () => {},
    logout: async () => {},
};

const authContext = React.createContext<Auth>(defaultAuthValue);

function useAuth() {
    const [session, setSession] = React.useState<SessionData | null>(null);

    return {
        session: session,
        login: async (email: string, password: string) => {
            const query = supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                console.error(res.error);
            }

            return new Promise<void>((resolve, reject) => {
                if (res.error) {
                    console.error(res.error);
                    reject();
                }

                setSession(res.data);
                resolve();
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
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
    return React.useContext(authContext);
}
