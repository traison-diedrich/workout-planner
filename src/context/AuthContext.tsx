import * as React from 'react';
import { SessionData, useAuth } from '../hooks/useAuth';

interface Auth {
    session: SessionData | null;
    getSession: () => Promise<SessionData>;
    login: (email: string, password: string) => Promise<SessionData>;
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
