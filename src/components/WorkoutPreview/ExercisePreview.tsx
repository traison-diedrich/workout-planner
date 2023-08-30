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
            <th>{index + 1}</th>
            <td className="text-lg">{name}</td>
            <td>
                <NumberBox value={sets} size="text-3xl" />
            </td>
            <td className="">
                <IconX />
            </td>
            <td>
                <NumberBox value={reps} size="text-3xl" />
            </td>
        </tr>
    );
};
