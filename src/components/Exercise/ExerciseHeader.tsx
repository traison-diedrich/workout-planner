import { IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoType } from '../../data/database.types';

interface ExerciseHeaderProps {
    options: ExerciseInfoType[];
    onDelete: (id: number) => void;
    e_type_id: number;
    id: number;
    index: number;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
    options,
    onDelete,
    id,
    e_type_id,
    index,
}) => {
    return (
        <div className="flex w-full items-center">
            <select
                name={`exercise-${index}-${id}-e_type_id`}
                className="select w-full max-w-xs"
                defaultValue={e_type_id}
            >
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-square btn-ghost"
                type="button"
                onClick={() => onDelete(index)}
            >
                <IconTrash />
            </button>
        </div>
    );
};
