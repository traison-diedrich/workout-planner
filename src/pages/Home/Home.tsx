import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

export const Home: React.FC = () => {
    const { session } = useAuth();

    const email = session?.user?.email;

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="flex max-w-lg flex-col gap-4">
                    <span className="text-2xl font-bold">
                        Welcome to your Workout Planner
                        <br />
                        <span className="text-lg font-normal">{email}</span>
                    </span>
                    <Link to="/auth/workouts">
                        <button className="btn btn-primary">
                            Plan your next workout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
