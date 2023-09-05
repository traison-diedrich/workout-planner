import {
    IconArrowsMoveVertical,
    IconDotsVertical,
    IconX,
} from '@tabler/icons-react';
import { forwardRef } from 'react';
import { NumberBox, NumberStepper } from '../../components';
import { ExerciseInfoType, ExerciseType } from '../../data/supabase';

interface DraggableExerciseProps {
    exercise: ExerciseType;
    options: ExerciseInfoType[];
}

type Ref = HTMLIFrameElement;

export const DraggableExercise = forwardRef<Ref, DraggableExerciseProps>(
    ({ exercise, options, ...props }, ref) => {
        return (
            <div {...props} ref={ref} className="h-full w-full">
                <div className="no-animation h-full w-full max-w-lg rounded-xl bg-base-100 shadow-xl">
                    <div className="flex h-full w-full items-center gap-2 py-6 pl-6 pr-2">
                        <div className="flex flex-col justify-center gap-4">
                            <div className="select select-primary w-full items-center">
                                {options.find(
                                    option => option.id === exercise.e_type_id,
                                )?.label || 'Label not found'}
                            </div>
                            <div className="flex w-full items-center justify-center gap-4">
                                <div className="inline-flex flex-col items-center gap-2">
                                    <NumberBox
                                        value={exercise.sets}
                                        title="SETS"
                                        size="text-5xl"
                                    />
                                    <NumberStepper />
                                </div>
                                <IconX size={32} className="mb-16" />
                                <div className="inline-flex flex-col items-center gap-2">
                                    <NumberBox
                                        value={exercise.reps}
                                        title="REPS"
                                        size="text-5xl"
                                    />
                                    <NumberStepper />
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
                            </div>
                            <button className="btn btn-ghost px-0 pb-2 pt-1">
                                <IconArrowsMoveVertical size={40} />
                            </button>
                            <span className="text-3xl">
                                {exercise.exercise_order + 1}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
);
