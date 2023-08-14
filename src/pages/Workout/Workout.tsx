import { IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { Exercise } from '../../components/Exercise/Exercise';
import { ExerciseType } from '../../data/database.types';
import { DeleteModal } from './DeleteModal';

export const Workout: React.FC = () => {
    const exercises = useLoaderData() as ExerciseType[];
    const state = useLocation();

    const [showModal, setShowModal] = React.useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-6 p-6">
            <h1 className="w-full text-center text-4xl">{state.state.name}</h1>
            <div className="flex w-full justify-end">
                <button
                    onClick={toggleModal}
                    className="btn btn-square btn-ghost"
                >
                    <IconTrash />
                </button>
            </div>
            <DeleteModal
                open={showModal}
                toggleOpen={toggleModal}
                name={state.state.name}
            />
            <div className="flex w-full flex-wrap justify-center gap-6">
                {exercises?.map(exercise => (
                    <Exercise
                        key={exercise.id}
                        name={exercise.exercise_types?.label}
                        sets={exercise.sets}
                        reps={exercise.reps}
                    />
                ))}
            </div>
        </div>
    );
};
