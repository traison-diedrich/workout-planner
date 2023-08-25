import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import * as React from 'react';
import { useAuth } from '../hooks';

const authContext = React.createContext<{
    event: AuthChangeEvent | null;
    user: User | null;
    session: Session | null;
}>({ event: null, user: null, session: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const session = useAuth();

    return (
        <authContext.Provider value={session}>{children}</authContext.Provider>
    );
};

export function AuthConsumer() {
    return React.useContext(authContext);
}
