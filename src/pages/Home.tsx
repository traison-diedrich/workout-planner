import * as React from 'react';

export const Home: React.FC = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">
                        Welcome to Workout Planner
                    </h1>
                    <p className="py-6">
                        A solution for easily planning and tracking your
                        workouts
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};
