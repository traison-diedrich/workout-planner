import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { NewWorkoutButton } from '../components/NewWorkoutButton/NewWorkoutButton';
import { WorkoutPreview } from '../components/WorkoutPreview/WorkoutPreview';
import { WorkoutType } from '../data/database.types';

export const AllWorkouts: React.FC = () => {
    const workouts: WorkoutType[] = useLoaderData() as WorkoutType[];

    return (
        <div className="h-full min-h-screen w-full text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="flex flex-wrap justify-center gap-6 p-4">
                {workouts?.map(workout => (
                    <WorkoutPreview
                        key={workout.id}
                        wid={workout.id}
                        name={workout.name}
                    />
                ))}
                <NewWorkoutButton />
            </div>
        </div>
    );
};
