import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    IconArrowsMoveVertical,
    IconDotsVertical,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
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
    index: number;
    setExercise: (exercise: ExerciseType) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
    exercise,
    options,
    index,
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

    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: exercise.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className={`h-full w-full max-w-lg cursor-default rounded-xl bg-base-100 shadow-lg ${
                isDragging ? 'opacity-30' : ''
            }`}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div className="flex h-full w-full items-center gap-2 py-6 pl-6 pr-2">
                <div className="flex flex-col justify-center gap-4">
                    <ExerciseHeader
                        e_type_id={exercise.e_type_id}
                        options={options}
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
                <div className="flex min-h-full flex-col items-center justify-between">
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-square btn-ghost btn-sm"
                        >
                            <IconDotsVertical />
                        </label>
                        {/* TODO: This dropdown has no contrast, more of a
                        theming issue that needs to be fixed */}
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content rounded-box z-[1] mt-1 bg-base-100 p-2 shadow"
                        >
                            <li>
                                <a onClick={() => deletion.mutate()}>
                                    <IconTrash />
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-ghost px-0 pb-2 pt-1"
                        ref={setActivatorNodeRef}
                        {...listeners}
                    >
                        <IconArrowsMoveVertical size={40} />
                    </button>
                    <span className="text-3xl">{index + 1}</span>
                </div>
            </div>
        </div>
    );
};
