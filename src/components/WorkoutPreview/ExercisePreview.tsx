import { IconX } from '@tabler/icons-react';
import * as React from 'react';
import { NumberBox } from '../NumberBox';

interface ExercisePreviewProps {
    name: string | undefined;
    sets: number;
    reps: number;
    index: number;
}

export const ExercisePreview: React.FC<ExercisePreviewProps> = ({
    name,
    sets,
    reps,
    index,
}) => {
    return (
        <tr>
            <th className="p-2 text-center sm:p-3">{index + 1}</th>
            <td className="p-3 text-lg sm:p-3">{name}</td>
            <td className="p-3 sm:p-3">
                <NumberBox value={sets} size="text-3xl" />
            </td>
            <td className="p-0 sm:p-3">
                <IconX />
            </td>
            <td className="p-3 sm:p-3">
                <NumberBox value={reps} size="text-3xl" />
            </td>
        </tr>
    );
};
