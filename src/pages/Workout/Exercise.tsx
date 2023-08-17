import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { ExerciseInfoType } from '../../data/supabase/database.types';
import { ExerciseHeader } from './ExerciseHeader';

interface ExerciseProps {
    id: number;
    index: number;
    initialSets: number;
    initialReps: number;
    e_type_id: number;
    options: ExerciseInfoType[];
    onDelete: (id: number) => void;
}

export const Exercise: React.FC<ExerciseProps> = props => {
    const [sets, setSets] = React.useState<number>(props.initialSets);
    const [reps, setReps] = React.useState<number>(props.initialReps);

    return (
        <div className="card w-96 shadow-xl">
            <input
                type="number"
                name={`exercise-${props.index}-${props.id}-sets`}
                value={sets}
                readOnly
                className="invisible h-0 w-0"
            />
            <input
                type="number"
                name={`exercise-${props.index}-${props.id}-reps`}
                value={reps}
                readOnly
                className="invisible m-0 h-0"
            />
            <div className="card-body gap-4">
                <ExerciseHeader
                    options={props.options}
                    e_type_id={props.e_type_id}
                    onDelete={props.onDelete}
                    id={props.id}
                    index={props.index}
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
