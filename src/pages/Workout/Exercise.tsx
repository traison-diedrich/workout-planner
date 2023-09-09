import {
    IconArrowsMoveVertical,
    IconDotsVertical,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { SortableItemContext } from '../../components/SortableItem/SortableItem';
import { deleteExercise } from '../../data/crud';
import { ExerciseType } from '../../data/supabase/database.types';
interface ExerciseProps {
    exercise: ExerciseType;
    name: string;
    index: number;
    setExercise: (exercise: ExerciseType) => void;
    toggleSelectOpen: () => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
    exercise,
    name,
    index,
    setExercise,
    toggleSelectOpen,
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

    const { listeners, setActivatorNodeRef } =
        React.useContext(SortableItemContext);

    return (
        <div className="flex h-full max-w-md cursor-default items-center justify-center gap-2 rounded-xl bg-base-100 py-6 pl-6 pr-2 shadow-lg">
            <div className="flex flex-col justify-center gap-4">
                <button
                    className="select select-primary w-full max-w-xs items-center"
                    onClick={toggleSelectOpen}
                >
                    {name}
                </button>

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
                        className="menu dropdown-content rounded-box z-[1] mt-1 border border-neutral bg-base-100 p-2 shadow"
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
                    className="btn btn-primary cursor-grab touch-none px-0 pb-2 pt-1"
                    ref={setActivatorNodeRef}
                    {...listeners}
                >
                    <IconArrowsMoveVertical size={40} />
                </button>
                <span className="text-3xl">{index + 1}</span>
            </div>
        </div>
    );
};
