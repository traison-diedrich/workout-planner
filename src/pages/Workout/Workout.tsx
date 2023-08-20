import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AddCard } from '../../components';
import { readExerciseInfo, readExercises, readWorkout } from '../../data/crud';
import { DeleteModal, Exercise } from './';

export type ExerciseStateType = {
    e_type_id: number;
    sets: number;
    reps: number;
};

export const Workout: React.FC = () => {
    // getting workout name through state.pathname until I can
    // figure out how to pass it down properly
    const state = useLocation();
    const wid = parseInt(state.pathname.split('/').pop() || '');

    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const { data: workout } = useQuery({
        queryKey: ['workouts', wid],
        queryFn: () => readWorkout(wid),
    });
    const { data: exercises } = useQuery({
        queryKey: ['exercises', wid],
        queryFn: () => readExercises(wid),
    });
    const { data: exerciseInfo } = useQuery({
        queryKey: ['exerciseInfo'],
        queryFn: readExerciseInfo,
    });

    return (
        <>
            <DeleteModal
                open={showModal}
                name={workout?.name || ''}
                toggleOpen={toggleModal}
                onDelete={null}
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
                    {/* FIXME: this is not a safe way of accessing 
                        the workout name */}
                    <input
                        type="text"
                        placeholder="Workout Name"
                        name="name"
                        defaultValue={state.state.name}
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
                    {exercises?.map((exercise, index) => (
                        <Exercise
                            key={index}
                            options={exerciseInfo || []}
                            id={exercise.id}
                            e_type_id={exercise.e_type_id}
                            initialSets={exercise.sets}
                            initialReps={exercise.reps}
                            onDelete={null}
                            setExercise={null}
                        />
                    ))}
                </div>
                <AddCard onAdd={null} />
                <button onClick={null} className="btn btn-primary w-96">
                    Save
                </button>
            </div>
        </>
    );
};
