import * as React from 'react';
import { Link } from 'react-router-dom';

export const Welcome: React.FC = () => {
    return (
        <div className="hero relative min-h-screen">
            <Link
                to="/login"
                className="btn btn-ghost btn-sm absolute right-8 top-8"
            >
                Login
            </Link>
            <div className="hero-content flex-col">
                <h1>Welcome to Workout Planner</h1>
                <Link to="/signup" className="btn btn-primary">
                    Get Started
                </Link>
            </div>
        </div>
    );
};
