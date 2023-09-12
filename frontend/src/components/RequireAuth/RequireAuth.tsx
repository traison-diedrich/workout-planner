import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthConsumer } from '../../context';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user } = AuthConsumer();

    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate
            to="/access/login"
            replace
            state={{ path: location.pathname }}
        />
    );
};
