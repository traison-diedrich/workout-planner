import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox } from './NumberBox';
import { NumberStepper } from './NumberStepper';

interface ExerciseProps {
    id: number;
    name: string;
    sets: number;
    reps: number;
}

export const Exercise: React.FC<ExerciseProps> = ({ id, name, sets, reps }) => {
    return (
        <div className="card w-96 bg-neutral shadow-xl">
            <div className="card-body gap-4">
                <input
                    type="text"
                    name={`exercise-${id}-name`}
                    defaultValue={name}
                    className="input input-ghost max-w-xs text-2xl"
                />
                <input
                    type="number"
                    name={`exercise-${id}-sets`}
                    defaultValue={sets}
                    className="input input-ghost max-w-xs text-2xl"
                />
                <input
                    type="number"
                    name={`exercise-${id}-reps`}
                    defaultValue={reps}
                    className="input input-ghost max-w-xs text-2xl"
                />
                <div className="flex w-full items-center justify-center gap-4">
                    <div className="inline-flex flex-col gap-2">
                        <NumberBox value={sets} title="SETS" />
                        <NumberStepper onAdd={null} onSubtract={null} />
                    </div>
                    <IconX size={32} className="mb-7" />
                    <NumberBox value={reps} title="REPS" />
                </div>
            </div>
        </div>
    );
};
