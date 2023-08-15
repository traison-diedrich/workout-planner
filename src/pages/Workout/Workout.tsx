import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import {
    Form,
    useLoaderData,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { Exercise } from '../../components/Exercise/Exercise';
import { ExerciseType } from '../../data/database.types';
import { DeleteModal } from './DeleteModal';

export const Workout: React.FC = () => {
    const exercises = useLoaderData() as ExerciseType[];

    const state = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        console.log(showModal);
        setShowModal(!showModal);
    };

    return (
        <>
            <DeleteModal
                open={showModal}
                toggleOpen={toggleModal}
                name={state.state.name}
            />
            <Form
                method="post"
                id="workout"
                className="flex h-full min-h-screen w-full flex-col items-center gap-6 p-6"
            >
                <div className="flex w-full justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-square btn-ghost"
                    >
                        <IconArrowLeft />
                    </button>
                    <input
                        type="text"
                        placeholder="Workout Name"
                        name="name"
                        defaultValue={state.state.name}
                        className="input input-bordered input-primary w-auto max-w-xs text-center text-4xl"
                    />
                    <button
                        onClick={toggleModal}
                        type="button"
                        className="btn btn-square btn-ghost"
                    >
                        <IconTrash />
                    </button>
                </div>
                <div className="flex w-full justify-between"></div>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    {exercises?.map(exercise => (
                        <Exercise
                            key={exercise.id}
                            id={exercise.id}
                            name={exercise.exercise_types?.label}
                            sets={exercise.sets}
                            reps={exercise.reps}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-1/2 max-w-lg"
                >
                    Save
                </button>
            </Form>
        </>
    );
};
