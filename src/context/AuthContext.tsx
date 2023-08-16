import { Session } from '@supabase/supabase-js';
import * as React from 'react';
import { DbResult } from '../data/database.types';
import { supabase } from '../data/supabaseClient';

const authContext = React.createContext<Session | null>(null);

// pretty sure the way this is structured will check the session on every
// page load, more research on how to handle user auth properly
function useAuth() {
    const [session, setSession] = React.useState<Session | null>(null);

    React.useEffect(() => {
        const fetchSession = async () => {
            const query = supabase.auth.getSession();
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                console.error(res.error);
                setSession(null);
                return;
            }

            setSession(res.data.session);
        };

        fetchSession();
    }, []);

    return session;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const session = useAuth();

    return (
        <authContext.Provider value={session}>{children}</authContext.Provider>
    );
};

export default function AuthConsumer() {
    return React.useContext(authContext);
}
