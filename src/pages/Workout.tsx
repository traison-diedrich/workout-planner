import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ExerciseType } from '../data/database.types';

interface WorkoutProps {
    wid?: number;
    name?: string;
}

export const Workout: React.FC<WorkoutProps> = () => {
    const exercises = useLoaderData() as ExerciseType[];

    return (
        <div className="h-full w-full">
            <ul>
                {exercises?.map(exercise => (
                    <li key={exercise.id}>{`${exercise.exercise_types?.label} 
                            ${exercise.sets} x 
                            ${exercise.reps}`}</li>
                ))}
            </ul>
        </div>
    );
};
