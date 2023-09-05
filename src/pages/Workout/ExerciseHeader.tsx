import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase/database.types';

interface ExerciseHeaderProps {
    options: ExerciseInfoType[];
    e_type_id: number;
    setType: (type: number) => void;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
    options,
    e_type_id,
    setType,
}) => {
    return (
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
    );
};
