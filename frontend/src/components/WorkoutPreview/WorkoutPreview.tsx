import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { readWorkoutExercises } from '../../data/crud/read';
import { ExercisePreview, Header } from './';

interface WorkoutPreviewProps {
    workout_id: number;
    name: string;
}

export const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({
    workout_id,
    name,
}) => {
    const { data: exercises, isLoading } = useQuery({
        queryKey: ['exercises', { workout_id: workout_id }],
        queryFn: () => readWorkoutExercises(workout_id),
    });

    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
                <Header title={name} wid={workout_id} />
                <div className="relative z-0 flex h-80 items-start justify-center overflow-x-auto rounded-lg border border-solid border-primary">
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg self-center" />
                    ) : (
                        <table className="table table-zebra table-pin-rows">
                            <thead>
                                <tr>
                                    <th className="p-2 sm:p-3"></th>
                                    <th className="p-2 sm:p-3">Name</th>
                                    <th className="p-2 text-center sm:p-3">
                                        Sets
                                    </th>
                                    <th className="p-0 sm:p-3"></th>
                                    <th className="p-2 text-center sm:p-3">
                                        Reps
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {exercises!.map((exercise, index) => {
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
                    )}
                </div>
            </div>
        </div>
    );
};
