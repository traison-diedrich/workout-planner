import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import * as React from 'react';
import { getSession } from '../data/auth';
import { supabase } from '../data/supabase';

export const useAuth = () => {
    const [session, setSession] = React.useState<Session | null>(null);
    const [user, setUser] = React.useState<User | null>(null);
    const [event, setEvent] = React.useState<AuthChangeEvent | null>(null);

    React.useEffect(() => {
        getSession().then(({ session }) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            setEvent(event);
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return { event, session, user };
};
