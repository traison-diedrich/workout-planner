import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getSession } from '../../data/auth';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
    });

    const location = useLocation();

    return session?.session ? (
        children
    ) : (
        <Navigate
            to="/access/login"
            replace
            state={{ path: location.pathname }}
        />
    );
};
