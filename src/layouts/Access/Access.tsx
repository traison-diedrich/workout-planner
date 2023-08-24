import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import gym from '../../assets/gym.jpg';
import { getSession } from '../../data/auth';
import WP from '/WP.svg';

export const Access: React.FC = () => {
    const { state } = useLocation();

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
    });

    return session?.session ? (
        <Navigate to={state?.path || '/auth/home'} replace />
    ) : (
        <div className="relative flex h-screen w-full">
            <Link
                to="/"
                className="btn btn-ghost absolute left-8 top-8 z-20 flex items-center gap-2"
            >
                <img src={WP} alt="Workout Planner Logo" className="h-8 w-8" />
                WP
            </Link>
            <div className="relative hidden h-full w-1/2 lg:block">
                <img
                    src={gym}
                    alt="Man in gym on phone"
                    className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-end bg-opacity-10 bg-gradient-to-t from-black via-transparent to-black p-8">
                    <p className="mb-2 text-lg font-bold">
                        "Don't stop when you're tired. Stop when you're done."
                    </p>
                    <p className="text-sm">David Goggins</p>
                </div>
            </div>
            <Outlet />
        </div>
    );
};
