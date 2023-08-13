import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { WorkoutPreview } from '../components/WorkoutPreview/WorkoutPreview';
import { WorkoutType } from '../data/database.types';

export const AllWorkouts: React.FC = () => {
    const workouts: WorkoutType[] = useLoaderData() as WorkoutType[];

    return (
        <div className="h-full w-full text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="grid h-full min-h-screen w-full grid-cols-1 content-evenly justify-center justify-items-center gap-6 p-4  md:grid-cols-2 xl:grid-cols-3">
                {workouts?.map(workout => (
                    <WorkoutPreview
                        key={workout.id}
                        wid={workout.id}
                        name={workout.name}
                    />
                ))}
            </div>
        </div>
    );
};
