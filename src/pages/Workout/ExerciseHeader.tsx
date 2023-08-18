import { IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase/database.types';

interface ExerciseHeaderProps {
    options: ExerciseInfoType[];
    onDelete: () => void;
    e_type_id: number;
    setType: (id: number) => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
    options,
    onDelete,
    e_type_id,
    setType,
}) => {
    return (
        <div className="flex w-full items-center gap-1">
            <select
                className="select select-primary w-full max-w-xs"
                defaultValue={e_type_id}
                onChange={e => setType(parseInt(e.target.value))}
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
                onClick={onDelete}
            >
                <IconTrash />
            </button>
        </div>
    );
};
