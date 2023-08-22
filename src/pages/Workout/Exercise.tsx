import { IconX } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { deleteExercise, readExercise } from '../../data/crud';
import { ExerciseInfoType } from '../../data/supabase/database.types';
import { ExerciseHeader } from './ExerciseHeader';

interface ExerciseProps {
    id: number;
    options: ExerciseInfoType[];
}

export const Exercise: React.FC<ExerciseProps> = ({ id, options }) => {
    const queryClient = useQueryClient();

    const { data: exercise } = useQuery({
        queryKey: ['exercises', id],
        queryFn: () => readExercise(id),
    });

    const deletion = useMutation({
        mutationFn: () => deleteExercise(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['exercises'] });
        },
    });

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body gap-4">
                <ExerciseHeader
                    e_type_id={exercise?.e_type_id}
                    options={options}
                    onDelete={() => deletion.mutate()}
                />
                <div className="flex w-full items-center justify-center gap-4">
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox
                            value={exercise?.sets}
                            title="SETS"
                            size="text-5xl"
                        />
                        <NumberStepper onAdd={null} onSubtract={null} />
                    </div>
                    <IconX size={32} className="mb-16" />
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox
                            value={exercise?.reps}
                            title="REPS"
                            size="text-5xl"
                        />
                        <NumberStepper onAdd={null} onSubtract={null} />
                    </div>
                </div>
            </div>
        </div>
    );
};
