import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox } from '../NumberBox';

interface ExercisePreviewProps {
    name: string | undefined;
    sets: number;
    reps: number;
}

export const ExercisePreview: React.FC<ExercisePreviewProps> = ({
    name,
    sets,
    reps,
}) => {
    return (
        <li className="p-1">
            <div className="flex items-center">
                <p className="text-left text-xl">{name}</p>
                <div className="flex items-center justify-end gap-2">
                    <NumberBox value={sets} size="text-3xl" />
                    <IconX />
                    <NumberBox value={reps} size="text-3xl" />
                </div>
            </div>
        </li>
    );
};
