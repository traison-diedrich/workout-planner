import * as React from 'react';
import { ExerciseType } from '../../data/supabase/database.types';
import { useData } from '../../hooks/useData';
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
    const { readExercises, exerciseInfo, readExerciseInfo } = useData();
    const [exercises, setExercises] = React.useState<ExerciseType[] | null>(
        null,
    );

    React.useEffect(() => {
        readExerciseInfo();
        readExercises(wid).then(exercises => {
            setExercises(exercises);
        });
    }, []);

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
