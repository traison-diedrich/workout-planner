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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddCard, ExerciseSelect, SortableItem } from '../../components';
import { ExerciseReadWithInfo } from '../../data/supabase/database.types';
import { useApi } from '../../hooks';
import { DeleteModal, DraggableExercise, Exercise, WorkoutHeader } from './';

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

/**
 *  TODO: as of right now, the workout changes will only be saved
 *  if the user clicks the save or back button. react-router-dom v6
 *  no longer supports the tools to block navigation with dirty data
 *  either create a custom useBlocker() hook to prevent navigation
 *  with unsaved changes or find a different router (most likely option)
 */
export const Workout: React.FC = () => {
    const queryClient = useQueryClient();
    const state = useLocation();
    const navigate = useNavigate();
    // getting workout name through state.pathname until I can
    // figure out how to pass it down properly
    const workout_id = parseInt(state.pathname.split('/').pop() || '');

    const [name, setName] = React.useState('');
    const [exercises, setExercises] = React.useState<ExerciseReadWithInfo[]>(
        [],
    );
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState<
        number | null
    >(null);
    const [draggingExercise, setDraggingExercise] =
        React.useState<ExerciseReadWithInfo | null>(null);

    const toggleExerciseSelect = (index: number | null) => {
        if (currentExerciseIndex === index) {
            setCurrentExerciseIndex(null);
        }

        setCurrentExerciseIndex(index);
    };

    const {
        readWorkout,
        createExercise,
        deleteWorkout,
        deleteExercise,
        updateWorkoutAndExercises,
    } = useApi();

    const { isLoading } = useQuery({
        queryKey: ['workout', workout_id],
        queryFn: () => readWorkout(workout_id),
        onSuccess: data => {
            setName(data.name), setExercises(data.exercises);
        },
    });

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

    const addExercise = useMutation({
        mutationFn: () => createExercise(workout_id),
        onSuccess: newExercise => {
            setExercises([...exercises, newExercise]);
        },
    });

    const delExercise = useMutation({
        mutationFn: (exercise_id: number) => deleteExercise(exercise_id),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['workouts', workout_id],
            }),
    });

    // there is a better way to do this where the function updateWorkout
    // returns the updated workout, but without a custom api this will do
    // see: https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses
    const update = useMutation({
        mutationFn: () =>
            updateWorkoutAndExercises(workout_id, name, exercises),
        onSuccess: () => {
            queryClient.invalidateQueries(['workout', workout_id]);
        },
    });

    const deletion = useMutation({
        mutationFn: () => deleteWorkout(workout_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workouts'],
            });
        },
    });

    // client side update
    const updateExercise = (index: number, exercise: ExerciseReadWithInfo) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            ...exercise,
        };
        console.log(updatedExercises);
        setExercises(updatedExercises);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;

        const foundIndex = exercises.findIndex(
            exercise => exercise.id === active.id,
        );

        exercises[foundIndex].exercise_order = foundIndex;
        setDraggingExercise(exercises[foundIndex]);
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

        setDraggingExercise(null);
    };

    return (
        <>
            <DeleteModal
                open={showDeleteModal}
                name={name}
                toggleOpen={() => setShowDeleteModal(!showDeleteModal)}
                onDelete={() => {
                    deletion.mutate();
                    navigate(-1);
                }}
            />
            <ExerciseSelect
                open={currentExerciseIndex !== null}
                handleClose={() => setCurrentExerciseIndex(null)}
                handleSelect={(new_info_id, exercise_name) => {
                    updateExercise(currentExerciseIndex!, {
                        ...exercises[currentExerciseIndex!],
                        exercise_info_id: new_info_id,
                        exercise_info: {
                            id: new_info_id,
                            name: exercise_name,
                        },
                    });
                }}
            />
            {/* TODO: create a ref to navbar for its current height */}
            <div
                className="flex w-full flex-col items-center gap-4 bg-base-200 p-4"
                style={{ height: 'calc(100vh - 64px)' }}
            >
                <WorkoutHeader
                    name={name}
                    workout_id={workout_id}
                    openDeleteModal={() => setShowDeleteModal(true)}
                />
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
                                                exercise={exercise}
                                                setExercise={(
                                                    exercise: ExerciseReadWithInfo,
                                                ) =>
                                                    updateExercise(
                                                        index,
                                                        exercise,
                                                    )
                                                }
                                                toggleSelectOpen={() =>
                                                    toggleExerciseSelect(index)
                                                }
                                                onDelete={() => {
                                                    delExercise.mutate(
                                                        exercise.id,
                                                    );
                                                    setExercises(
                                                        exercises.filter(
                                                            e =>
                                                                e.id !==
                                                                exercise.id,
                                                        ),
                                                    );
                                                }}
                                            />
                                        </SortableItem>
                                    ))}
                                    <div className="w-full pb-8">
                                        <AddCard
                                            onAdd={() => addExercise.mutate()}
                                            loading={addExercise.isLoading}
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
                                    {draggingExercise ? (
                                        <DraggableExercise
                                            exercise={draggingExercise}
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
