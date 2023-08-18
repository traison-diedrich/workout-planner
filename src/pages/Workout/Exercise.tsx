import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { ExerciseInfoType } from '../../data/supabase/database.types';
import { ExerciseHeader } from './ExerciseHeader';
import { ExerciseStateType } from './Workout';

interface ExerciseProps {
    id: number;
    initialSets: number;
    initialReps: number;
    e_type_id: number;
    options: ExerciseInfoType[];
    onDelete: () => void;
    setExercise(exercise: ExerciseStateType): void;
}

export const Exercise: React.FC<ExerciseProps> = props => {
    const [e_type_id, setEid] = React.useState<number>(props.e_type_id); // [Exercise ID
    const [sets, setSets] = React.useState<number>(props.initialSets);
    const [reps, setReps] = React.useState<number>(props.initialReps);

    React.useEffect(() => {
        const updatedExercise: ExerciseStateType = {
            e_type_id: e_type_id,
            sets: sets,
            reps: reps,
        };

        props.setExercise(updatedExercise);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [e_type_id, sets, reps]);

    return (
        <div className="card w-96 shadow-xl">
            <div className="card-body gap-4">
                <ExerciseHeader
                    options={props.options}
                    e_type_id={props.e_type_id}
                    onDelete={props.onDelete}
                    setType={setEid}
                />
                <div className="flex w-full items-center justify-center gap-4">
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox value={sets} title="SETS" size="text-5xl" />
                        <NumberStepper
                            onAdd={() => setSets(sets + 1)}
                            onSubtract={() => {
                                if (sets > 1) {
                                    setSets(sets - 1);
                                }
                            }}
                        />
                    </div>
                    <IconX size={32} className="mb-16" />
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox value={reps} title="REPS" size="text-5xl" />
                        <NumberStepper
                            onAdd={() => setReps(reps + 1)}
                            onSubtract={() => {
                                if (sets > 1) {
                                    setReps(reps - 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
