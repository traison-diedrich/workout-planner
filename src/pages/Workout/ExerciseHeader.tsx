import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase/database.types';

interface ExerciseHeaderProps {
    index: number;
    options: ExerciseInfoType[];
    e_type_id: number;
    setType: (type: number) => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
    index,
    options,
    e_type_id,
    setType,
}) => {
    return (
        <div className="flex w-full items-center gap-3">
            <span className="text-4xl">{index + 1}</span>
            <select
                className="select select-primary mr-6 w-full max-w-xs"
                defaultValue={e_type_id}
                onChange={e => setType(parseInt(e.target.value))}
            >
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
