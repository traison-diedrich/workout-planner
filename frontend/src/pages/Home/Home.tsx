import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../context';
import { readValidToken } from '../../data/crud/read';

export const Home: React.FC = () => {
    const { user, session } = AuthConsumer();

    const email = user?.email;

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
                    <button
                        className="btn btn-secondary"
                        onClick={() => readValidToken(session!.access_token)}
                    >
                        Token?
                    </button>
                </div>
            </div>
        </div>
    );
};
