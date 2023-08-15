import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { AddCard } from '../../components/AddCard';
import { WorkoutPreview } from '../../components/WorkoutPreview';
import { WorkoutType } from '../../data/database.types';

export const AllWorkouts: React.FC = () => {
    const workouts: WorkoutType[] = useLoaderData() as WorkoutType[];

    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-6 p-6 text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {workouts?.map(workout => (
                    <WorkoutPreview
                        key={workout.id}
                        wid={workout.id}
                        name={workout.name}
                    />
                ))}
                <AddCard type="submit" />
            </div>
        </div>
    );
};
