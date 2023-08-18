import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { session } = useAuth();
    const location = useLocation();

    return session?.session ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
};
