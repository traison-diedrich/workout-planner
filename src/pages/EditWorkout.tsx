import * as React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Exercise } from '../components/Exercise/Exercise';
import { ExerciseType } from '../data/database.types';

export const EditWorkout: React.FC = () => {
    const exercises = useLoaderData() as ExerciseType[];
    const state = useLocation();

    return (
        <div className="flex h-full w-full flex-col justify-center gap-6">
            <h1 className="w-full text-center text-4xl">{state.state.name}</h1>
            <div className="flex min-h-screen w-full flex-wrap justify-center gap-6 p-6">
                {exercises?.map(exercise => (
                    <Exercise
                        key={exercise.id}
                        name={exercise.exercise_types?.label}
                        sets={exercise.sets}
                        reps={exercise.reps}
                    />
                ))}
            </div>
        </div>
    );
};
