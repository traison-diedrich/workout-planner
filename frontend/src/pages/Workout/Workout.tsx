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
import { useLocation } from 'react-router-dom';
import { AddCard, ExerciseSelect, SortableItem } from '../../components';
import {
    ExerciseReadWithInfo,
    ExerciseUpdate,
} from '../../data/supabase/database.types';
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
    const state = useLocation();
    // getting workout name through state.pathname until I can
    // figure out how to pass it down properly
    const workout_id = parseInt(state.pathname.split('/').pop() || '');

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

    const [exercises, setExercises] = React.useState<ExerciseReadWithInfo[]>(
        [],
    );
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [selectingExerciseId, setSelectingExerciseId] = React.useState<
        number | null
    >(null);
    const [draggingExercise, setDraggingExercise] =
        React.useState<ExerciseReadWithInfo | null>(null);

    const { readWorkout, createExercise, updateExercises } = useApi();

    const queryClient = useQueryClient();
    const { data: workout, isSuccess } = useQuery({
        queryKey: ['workouts', workout_id],
        queryFn: () => readWorkout(workout_id),
        onSuccess: data => {
            setExercises(data.exercises);
        },
    });

    const addExercise = useMutation({
        mutationFn: () => createExercise(workout_id),
        onSuccess: newExercise => {
            setExercises([...exercises, newExercise]);
        },
    });

    const toggleExerciseSelect = (exercise_id: number) => {
        if (selectingExerciseId === exercise_id) {
            setSelectingExerciseId(null);
        }

        setSelectingExerciseId(exercise_id);
    };

    const update = useMutation({
        mutationFn: (exercises: ExerciseUpdate[]) => updateExercises(exercises),
        onSuccess: () => {
            queryClient.invalidateQueries(['workouts', workout_id]);
        },
    });

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

                const reorderedExercises = arrayMove(
                    exercises,
                    oldIndex,
                    newIndex,
                );
                const updatedExercises = reorderedExercises.map(
                    (exercise, index) => ({
                        ...exercise,
                        exercise_order: index,
                    }),
                );
                update.mutate(updatedExercises);
                return updatedExercises;
            });
        }

        setDraggingExercise(null);
    };

    return (
        <>
            <DeleteModal
                open={showDeleteModal}
                workout_id={workout_id}
                name={isSuccess ? workout.name : ''}
                toggleOpen={() => setShowDeleteModal(!showDeleteModal)}
            />
            <ExerciseSelect
                open={selectingExerciseId !== null}
                selectingExerciseId={selectingExerciseId}
                workout_id={workout_id}
                handleClose={() => setSelectingExerciseId(null)}
            />
            {/* TODO: create a ref to navbar for its current height */}
            <div
                className="flex w-full flex-col items-center gap-4 bg-base-200 p-4"
                style={{ height: 'calc(100vh - 64px)' }}
            >
                <WorkoutHeader
                    name={isSuccess ? workout.name : ''}
                    workout_id={workout_id}
                    openDeleteModal={() => setShowDeleteModal(true)}
                />
                <div className="flex h-full w-full overflow-y-auto">
                    <div className="mx-auto mb-5 flex flex-col items-center gap-4">
                        {!isSuccess ? (
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
                                    {exercises.map((exercise, index) => (
                                        <SortableItem
                                            key={exercise.id}
                                            id={exercise.id}
                                        >
                                            <Exercise
                                                index={index}
                                                exercise={exercise}
                                                toggleSelectOpen={() =>
                                                    toggleExerciseSelect(
                                                        exercise.id,
                                                    )
                                                }
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
            </div>
        </>
    );
};
