import * as React from 'react';

interface ExerciseProps {
    name: string;
    sets: number;
    reps: number;
}

export const Exercise: React.FC<ExerciseProps> = ({ name, sets, reps }) => {
    return <li>{`${name} ${sets} x ${reps}`}</li>;
};
