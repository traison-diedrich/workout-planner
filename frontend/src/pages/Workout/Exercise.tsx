import {
    IconArrowsMoveVertical,
    IconDotsVertical,
    IconTrash,
    IconX,
} from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import * as React from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { SortableItemContext } from '../../components/SortableItem/SortableItem';
import {
    ExerciseReadWithInfo,
    ExerciseUpdate,
} from '../../data/supabase/database.types';
import { useApi } from '../../hooks';
interface ExerciseProps {
    exercise: ExerciseReadWithInfo;
    index: number;
    toggleSelectOpen: () => void;
}

const DEBOUNCE_TIME_MS = 500;

export const Exercise: React.FC<ExerciseProps> = ({
    exercise,
    index,
    toggleSelectOpen,
}) => {
    const { deleteExercise, updateExercise } = useApi();
    const queryClient = useQueryClient();

    const [sets, setSets] = React.useState<number>(exercise.sets);
    const [reps, setReps] = React.useState<number>(exercise.reps);

    const deletion = useMutation({
        mutationFn: () => deleteExercise(exercise.id),
        onSuccess: () => {
            queryClient.invalidateQueries(['workouts', exercise.workout_id]);
        },
    });

    const update = useMutation({
        mutationFn: (updatedExercise: ExerciseUpdate) =>
            updateExercise(updatedExercise),
        onSuccess: () => {
            queryClient.invalidateQueries(['workouts', exercise.workout_id]);
        },
    });

    const onChange = React.useMemo(
        () =>
            debounce((sets: number, reps: number) => {
                if (exercise.sets !== sets || exercise.reps !== reps) {
                    update.mutate({ id: exercise.id, sets: sets, reps: reps });
                }
            }, DEBOUNCE_TIME_MS),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    React.useEffect(() => {
        onChange(sets, reps);

        return () => {
            onChange.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sets, reps]);

    const { listeners, setActivatorNodeRef } =
        React.useContext(SortableItemContext);

    return (
        <div className="flex h-full max-w-md cursor-default items-center justify-center gap-2 rounded-xl bg-base-100 py-6 pl-6 pr-2 shadow-lg dark:shadow-none">
            <div className="flex flex-col justify-center gap-4">
                <button
                    className="select select-primary w-full max-w-xs items-center"
                    onClick={toggleSelectOpen}
                >
                    {exercise!.exercise_info!.name}
                </button>

                <div className="flex w-full items-center justify-center gap-4">
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox value={sets} title="SETS" size="text-5xl" />
                        <NumberStepper
                            onAdd={() => {
                                setSets(sets + 1);
                            }}
                            onSubtract={() => {
                                if (sets > 1) setSets(sets - 1);
                            }}
                        />
                    </div>
                    <IconX size={32} className="mb-16" />
                    <div className="inline-flex flex-col items-center gap-2">
                        <NumberBox value={reps} title="REPS" size="text-5xl" />
                        <NumberStepper
                            onAdd={() => setReps(reps + 1)}
                            onSubtract={() => {
                                if (reps > 1) setSets(reps - 1);
                            }}
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
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content rounded-box z-[1] mt-1 border-neutral bg-base-100 p-2 shadow-lg dark:border dark:shadow-none"
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
