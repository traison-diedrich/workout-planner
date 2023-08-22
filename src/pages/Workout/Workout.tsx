import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddCard } from '../../components';
import {
    createExercise,
    deleteWorkout,
    readExerciseInfo,
    readExercises,
    readWorkout,
} from '../../data/crud';
import { DeleteModal, Exercise } from './';

export type ExerciseStateType = {
    e_type_id: number;
    sets: number;
    reps: number;
};

export const Workout: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const state = useLocation();
    const navigate = useNavigate();
    // getting workout name through state.pathname until I can
    // figure out how to pass it down properly
    const wid = parseInt(state.pathname.split('/').pop() || '');

    const queryClient = useQueryClient();

    const { data: workout } = useQuery({
        queryKey: ['workouts', wid],
        queryFn: () => readWorkout(wid),
    });
    const { data: exerciseInfo } = useQuery({
        queryKey: ['exerciseInfo'],
        queryFn: readExerciseInfo,
    });
    const { data: exercises, isLoading } = useQuery({
        queryKey: ['exercises', wid],
        queryFn: () => readExercises(wid),
    });

    const deletion = useMutation({
        mutationFn: () => deleteWorkout(wid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
            navigate('/auth/workouts/');
        },
    });

    const creation = useMutation({
        mutationFn: () => createExercise(wid),
        onSuccess: () => {
            queryClient.invalidateQueries(['exercises']);
        },
    });

    return (
        <>
            <DeleteModal
                open={showModal}
                name={workout?.name || ''}
                toggleOpen={toggleModal}
                onDelete={() => deletion.mutate()}
            />
            <div className="flex h-full min-h-screen w-full flex-col items-center gap-6 bg-base-200 p-6">
                {/* TODO: implement a check to make sure user wants to 
                leave page with unsaved changes */}
                <div className="flex w-full max-w-2xl justify-between gap-2">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="btn btn-square btn-ghost"
                    >
                        <IconArrowLeft />
                    </button>
                    <input
                        type="text"
                        placeholder="Workout Name"
                        name="name"
                        defaultValue={workout?.name}
                        className="input input-bordered input-primary w-full text-center text-4xl"
                    />
                    <button
                        onClick={toggleModal}
                        className="btn btn-square btn-ghost"
                    >
                        <IconTrash />
                    </button>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg" />
                    ) : (
                        <>
                            {exercises?.map((exercise, index) => (
                                <Exercise
                                    key={index}
                                    options={exerciseInfo || []}
                                    id={exercise.id}
                                />
                            ))}
                            <AddCard onAdd={() => creation.mutate()} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
