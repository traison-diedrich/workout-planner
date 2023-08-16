import * as React from 'react';
import {
    DbResult,
    ExerciseInfoType,
    ExerciseType,
} from '../../data/database.types';
import { supabase } from '../../data/supabaseClient';
import { ExercisePreview } from './ExercisePreview';
import { Header } from './Header';

interface WorkoutPreviewProps {
    wid: number;
    name: string;
}

// TODO: This type is goofy and needs to be sorted out on the database
// end of this project. maybe exercise should include its name for
// simplicity's sake and then leave e_type_id to handle the muscle groups
interface ExercisePreviewType extends ExerciseType {
    exercise_types: ExerciseInfoType | null;
}

export const WorkoutPreview: React.FC<WorkoutPreviewProps> = ({
    wid,
    name,
}) => {
    const [exercises, setExercises] = React.useState<
        ExercisePreviewType[] | null
    >(null);

    // TODO: I would like to use the loader from data but the typings
    // drove me insane
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
        <div className="card w-96 shadow-xl">
            <div className="card-body">
                <Header title={name} wid={wid} />
                <ul>
                    {exercises?.map(exercise => (
                        <ExercisePreview
                            key={exercise.id}
                            name={exercise.exercise_types?.label}
                            sets={exercise.sets}
                            reps={exercise.reps}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
