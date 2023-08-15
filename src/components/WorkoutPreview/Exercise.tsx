import { IconX } from '@tabler/icons-react';
import * as React from 'react';

interface ExerciseProps {
    name: string;
    sets: number;
    reps: number;
}

export const Exercise: React.FC<ExerciseProps> = ({ name, sets, reps }) => {
    return (
        <li className="p-1">
            <div className="flex items-center gap-2 ">
                <p className="text-xl">{name}</p>
                <div className="rounded border border-primary p-1 text-3xl">
                    {sets}
                </div>
                <IconX />
                <div className="rounded border border-primary p-1 text-3xl">
                    {reps}
                </div>
            </div>
        </li>
    );
};
