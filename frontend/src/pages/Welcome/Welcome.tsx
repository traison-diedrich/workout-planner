import * as React from 'react';
import { Link } from 'react-router-dom';
import { exerciseSVG } from '../../assets';

export const Welcome: React.FC = () => {
    return (
        <div className="hero relative min-h-screen">
            <Link
                to="/access/login"
                className="btn btn-ghost btn-sm absolute right-8 top-8 z-10"
            >
                Login
            </Link>
            <div className="hero-content flex-col px-6 py-14">
                <h1 className="text-center text-5xl">
                    Welcome to
                    <br />
                    <span className="text-primary">Workout Planner</span>
                </h1>
                <img
                    src={exerciseSVG}
                    alt="woman exercising"
                    className="h-auto w-full"
                />
                <p className="text-center text-xl">
                    A free and open source workout assistant
                </p>
                <Link to="/access/signup" className="btn btn-primary btn-wide">
                    Get Started
                </Link>
            </div>
        </div>
    );
};
