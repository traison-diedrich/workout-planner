import * as React from 'react';
import { AddCard, WorkoutPreview } from '../../components';
import { useData } from '../../hooks/useData';

export const AllWorkouts: React.FC = () => {
    const { workouts, createWorkout } = useData();

    const onAdd = () => {
        createWorkout();
    };

    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-6 bg-base-200 p-6 text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {workouts?.map(workout => (
                    <WorkoutPreview
                        key={workout.id}
                        wid={workout.id}
                        name={workout.name}
                    />
                ))}
                <AddCard onAdd={onAdd} />
            </div>
        </div>
    );
};
