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
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <Header title={name} wid={wid} />
                <ul>
                    {exercises?.map(exercise => {
                        const exerciseName = exerciseInfo?.find(
                            item => item.id === exercise.e_type_id,
                        );

                        return (
                            <ExercisePreview
                                key={exercise.id}
                                name={exerciseName?.label}
                                sets={exercise.sets}
                                reps={exercise.reps}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
