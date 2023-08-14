import * as React from 'react';

interface ExerciseProps {
    name: string;
    sets: number;
    reps: number;
}

export const Exercise: React.FC<ExerciseProps> = ({ name, sets, reps }) => {
    return (
        <div className="card glass w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <h2>
                    {sets} x {reps}
                </h2>
            </div>
        </div>
    );
};
