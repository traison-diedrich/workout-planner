import * as React from 'react';
import { WorkoutReadWithExercises } from '../../data/supabase/database.types';
import { ExercisePreview, Header } from './';

interface WorkoutPreviewProps {
    workout: WorkoutReadWithExercises;
}

export const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({ workout }) => {
    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
                <Header title={workout.name} wid={workout.id} />
                <div className="relative z-0 flex h-80 items-start justify-center overflow-x-auto rounded-lg border border-solid border-primary">
                    <table className="table table-zebra table-pin-rows">
                        <thead>
                            <tr>
                                <th className="p-2 sm:p-3"></th>
                                <th className="p-2 sm:p-3">Name</th>
                                <th className="p-2 text-center sm:p-3">Sets</th>
                                <th className="p-0 sm:p-3"></th>
                                <th className="p-2 text-center sm:p-3">Reps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workout.exercises!.map((exercise, index) => {
                                return (
                                    <ExercisePreview
                                        key={exercise.id}
                                        name={exercise.exercise_info!.name}
                                        sets={exercise.sets!}
                                        reps={exercise.reps!}
                                        index={index}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
