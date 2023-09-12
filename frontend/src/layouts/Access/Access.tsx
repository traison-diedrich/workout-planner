import * as React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { gymImage } from '../../assets';
import { AuthConsumer } from '../../context';
import WP from '/WP.svg';

export const Access: React.FC = () => {
    const { user } = AuthConsumer();
    const { state } = useLocation();

    return user ? (
        <Navigate to={state?.path || '/auth/home'} replace />
    ) : (
        <div className="relative flex h-screen w-full">
            <Link
                to="/"
                className="btn btn-ghost absolute left-8 top-8 z-20 flex items-center gap-2 text-white"
            >
                <img src={WP} alt="Workout Planner Logo" className="h-8 w-8" />
                WP
            </Link>
            <div className="relative hidden h-full w-1/2 lg:block">
                <img
                    src={gymImage}
                    alt="Man in gym on phone"
                    className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-end bg-opacity-10 bg-gradient-to-t from-black via-transparent to-black p-8 text-white">
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
