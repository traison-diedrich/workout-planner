import * as React from 'react';
import { DbResult, ExerciseInfoType, ExerciseType } from '../../database.types';
import { supabase } from '../../supabaseClient';

interface WorkoutPreviewProps {
    wid: number;
    name: string;
}

interface ExercisePreviewType extends ExerciseType {
    exercise_types: ExerciseInfoType;
}

export const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({
    wid,
    name,
}) => {
    const [exercises, setExercises] = React.useState<
        ExercisePreviewType[] | null
    >(null);

    React.useEffect(() => {
        const fetchExercises = async () => {
            const query = supabase
                .from('exercises')
                .select('*, exercise_types(*)')
                .eq('wid', wid);
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                console.error(res.error);
            } else {
                setExercises(res.data);
            }
        };

        fetchExercises();
    }, [wid]);

    return (
        <div className="card glass w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <ul>
                    {exercises?.map(exercise => (
                        <li
                            key={exercise.id}
                        >{`${exercise.name} ${exercise.sets} x ${exercise.reps}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
