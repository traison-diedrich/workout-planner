import { IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { deleteExercise } from '../../data/crud';
import {
    ExerciseInfoType,
    ExerciseType,
} from '../../data/supabase/database.types';
import { ExerciseHeader } from './ExerciseHeader';

interface ExerciseProps {
    exercise: ExerciseType;
    options: ExerciseInfoType[];
    setExercise: (exercise: ExerciseType) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
    exercise,
    options,
    setExercise,
}) => {
    const queryClient = useQueryClient();

    const deletion = useMutation({
        mutationFn: () => deleteExercise(exercise.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
    });

    type ExerciseAttribute = 'sets' | 'reps';

    const handleAdd = (attr: ExerciseAttribute) => {
        const updatedExercise = {
            ...exercise,
            [attr]: exercise[attr] + 1,
        };
        setExercise(updatedExercise);
    };

    const handleSubtract = (attr: ExerciseAttribute) => {
        if (exercise[attr] === 1) return;
        const updatedExercise = {
            ...exercise,
            [attr]: exercise[attr] - 1,
        };
        setExercise(updatedExercise);
    };

    const handleTypeChange = (e_type_id: number) => {
        const updatedExercise = {
            ...exercise,
            e_type_id: e_type_id,
        };
        setExercise(updatedExercise);
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body gap-4">
                <ExerciseHeader
                    e_type_id={exercise.e_type_id}
                    options={options}
                    onDelete={() => deletion.mutate()}
                    setType={handleTypeChange}
                />
                <div className="flex w-full items-center justify-center gap-4">
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox
                            value={exercise.sets}
                            title="SETS"
                            size="text-5xl"
                        />
                        <NumberStepper
                            onAdd={() => handleAdd('sets')}
                            onSubtract={() => handleSubtract('sets')}
                        />
                    </div>
                    <IconX size={32} className="mb-16" />
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox
                            value={exercise.reps}
                            title="REPS"
                            size="text-5xl"
                        />
                        <NumberStepper
                            onAdd={() => handleAdd('reps')}
                            onSubtract={() => handleSubtract('reps')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
