import * as React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { session } = useAuth();

    return session ? children : <Navigate to="/login" replace />;
};
