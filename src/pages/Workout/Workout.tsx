import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MeasuringStrategy,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddCard, ExerciseSelect, SortableItem } from '../../components';
import {
    createExercise,
    deleteWorkout,
    readExerciseInfo,
    readExercises,
    readWorkout,
    updateWorkout,
} from '../../data/crud';
import { ExerciseType } from '../../data/supabase';
import { DeleteModal, DraggableExercise, Exercise } from './';

export type ExerciseUpdateType = {
    e_type_id?: number;
    sets?: number;
    reps?: number;
};

const measuringConfig = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

/** TODO: as of right now, the workout changes will only be saved
 *  if the user clicks the save or back button. react-router-dom v6
 *  no longer supports the tools to block navigation with dirty data
 *  either create a custom useBlocker() hook to prevent navigation
 *  with unsaved changes or find a different router (most likely option)
 */
export const Workout: React.FC = () => {
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState<
        number | null
    >(null);
    const toggleExerciseSelect = (index: number | null) => {
        if (currentExerciseIndex === index) {
            setCurrentExerciseIndex(null);
        }

        setCurrentExerciseIndex(index);
    };

    const state = useLocation();
    const navigate = useNavigate();
    // getting workout name through state.pathname until I can
    // figure out how to pass it down properly
    const wid = parseInt(state.pathname.split('/').pop() || '');

    const [name, setName] = React.useState('');

    useQuery({
        queryKey: ['workouts', wid],
        queryFn: () => readWorkout(wid),
        onSuccess: data => setName(data.name),
    });
    const { data: exerciseInfo } = useQuery({
        queryKey: ['exerciseInfo'],
        queryFn: readExerciseInfo,
    });

    const [exercises, setExercises] = React.useState<ExerciseType[]>([]);
    const [activeExercise, setActiveExercise] =
        React.useState<ExerciseType | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        }),
    );

    const queryClient = useQueryClient();
    const { isLoading } = useQuery({
        queryKey: ['exercises', wid],
        queryFn: () => readExercises(wid),
        onSuccess: data => setExercises(data),
    });

    const creation = useMutation({
        mutationFn: () => createExercise(wid, exercises.length),
        onSuccess: exercise => setExercises([...exercises, exercise]),
    });

    // client side update
    const updateExercise = (index: number, exercise: ExerciseUpdateType) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            ...exercise,
        };
        setExercises(updatedExercises);
    };

    // there is a better way to do this where the function updateWorkout
    // returns the updated workout, but without a custom api this will do
    // see: https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses
    const update = useMutation({
        mutationFn: () => updateWorkout(wid, name, exercises),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workouts', wid],
            });
            queryClient.invalidateQueries({
                queryKey: ['exercises', wid],
            });
        },
    });

    const deletion = useMutation({
        mutationFn: () => deleteWorkout(wid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
        },
    });

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const foundIndex = exercises.findIndex(
            exercise => exercise.id === active.id,
        );

        exercises[foundIndex].exercise_order = foundIndex;
        setActiveExercise(exercises[foundIndex]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setExercises(exercises => {
                const oldIndex = exercises.findIndex(
                    exercise => exercise.id === active.id,
                );
                const newIndex = exercises.findIndex(
                    exercise => exercise.id === over?.id,
                );

                return arrayMove(exercises, oldIndex, newIndex);
            });
        }

        setActiveExercise(null);
    };

    return (
        <>
            <DeleteModal
                open={showDeleteModal}
                name={name}
                toggleOpen={toggleDeleteModal}
                onDelete={() => {
                    deletion.mutate();
                    navigate(-1);
                }}
            />
            <ExerciseSelect
                open={currentExerciseIndex !== null}
                handleClose={() => setCurrentExerciseIndex(null)}
                options={exerciseInfo || []}
                handleSelect={id =>
                    updateExercise(currentExerciseIndex!, { e_type_id: id })
                }
            />
            {/* TODO: create a ref to navbar for its current height */}
            <div
                className="flex w-full flex-col items-center gap-4 bg-base-200 p-4"
                style={{ height: 'calc(100vh - 64px)' }}
            >
                <div className="flex w-full max-w-2xl justify-between gap-2">
                    <button
                        onClick={() => {
                            update.mutate();
                            navigate(-1);
                        }}
                        type="button"
                        className="btn btn-square btn-ghost"
                    >
                        <IconArrowLeft />
                    </button>
                    <input
                        type="text"
                        placeholder="Workout Name"
                        name="name"
                        defaultValue={name}
                        className="input input-bordered input-primary w-full text-center text-4xl"
                        onChange={e => setName(e.target.value)}
                    />
                    <button
                        onClick={toggleDeleteModal}
                        className="btn btn-square btn-ghost"
                    >
                        <IconTrash />
                    </button>
                </div>
                <div className="flex h-full w-full overflow-y-auto">
                    <div className="mx-auto mb-5 flex flex-col items-center gap-4">
                        {isLoading && exercises.length > 0 ? (
                            <span className="loading loading-spinner loading-lg" />
                        ) : (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                modifiers={[restrictToFirstScrollableAncestor]}
                                measuring={measuringConfig}
                            >
                                <SortableContext
                                    items={exercises}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {exercises?.map((exercise, index) => (
                                        <SortableItem
                                            key={exercise.id}
                                            id={exercise.id}
                                        >
                                            <Exercise
                                                index={index}
                                                name={
                                                    exerciseInfo?.find(
                                                        info =>
                                                            info.id ===
                                                            exercise.e_type_id,
                                                    )?.label || 'Name not found'
                                                }
                                                exercise={exercise}
                                                setExercise={(
                                                    exercise: ExerciseType,
                                                ) =>
                                                    updateExercise(
                                                        index,
                                                        exercise,
                                                    )
                                                }
                                                toggleSelectOpen={() =>
                                                    toggleExerciseSelect(index)
                                                }
                                            />
                                        </SortableItem>
                                    ))}
                                    <div className="w-full pb-8">
                                        <AddCard
                                            onAdd={() => creation.mutate()}
                                        />
                                    </div>
                                </SortableContext>
                                <DragOverlay
                                    zIndex={2}
                                    dropAnimation={{
                                        duration: 500,
                                        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                                    }}
                                    transition={`transform 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22)`}
                                >
                                    {activeExercise ? (
                                        <DraggableExercise
                                            exercise={activeExercise}
                                            name={
                                                exerciseInfo?.find(
                                                    exerciseInfo =>
                                                        exerciseInfo.id ===
                                                        activeExercise.e_type_id,
                                                )?.label || 'Label not found'
                                            }
                                        />
                                    ) : null}
                                </DragOverlay>
                            </DndContext>
                        )}
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-wide"
                    onClick={() => {
                        update.mutate();
                        navigate(-1);
                    }}
                >
                    Save Workout
                </button>
            </div>
        </>
    );
};
