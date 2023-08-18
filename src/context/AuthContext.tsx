import { Provider } from '@supabase/gotrue-js';
import * as React from 'react';
import { SessionData, useAuth } from '../hooks/useAuth';

interface Auth {
    session: SessionData | null;
    login: (email: string, password: string) => Promise<void>;
    loginWith: (provider: Provider) => Promise<void>;
    logout: () => Promise<void>;
}

const authContext = React.createContext<Auth>({} as Auth);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
    return React.useContext(authContext);
}
