import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { readExerciseInfo, readExercises } from '../../data/crud';
import { ExercisePreview } from './ExercisePreview';
import { Header } from './Header';

interface WorkoutPreviewProps {
    wid: number;
    name: string;
}

export const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({
    wid,
    name,
}) => {
    const { data: exerciseInfo } = useQuery({
        queryKey: ['exerciseInfo'],
        queryFn: readExerciseInfo,
    });
    const { data: exercises } = useQuery({
        queryKey: ['exercises', wid],
        queryFn: () => readExercises(wid),
    });

    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
                <Header title={name} wid={wid} />
                <div className="relative h-80 overflow-x-auto rounded-lg border border-solid border-primary">
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
                            {exercises?.map((exercise, index) => {
                                const exerciseName = exerciseInfo?.find(
                                    item => item.id === exercise.e_type_id,
                                );

                                return (
                                    <ExercisePreview
                                        key={exercise.id}
                                        name={exerciseName?.label}
                                        sets={exercise.sets}
                                        reps={exercise.reps}
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
