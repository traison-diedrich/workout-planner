import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox } from '../Exercise/NumberBox';

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
                <NumberBox value={sets} size="text-3xl" />
                <IconX />
                <NumberBox value={reps} size="text-3xl" />
            </div>
        </li>
    );
};
