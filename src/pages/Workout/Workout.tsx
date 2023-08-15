import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import {
    Form,
    useLoaderData,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AddCard } from '../../components/AddCard';
import { Exercise } from '../../components/Exercise/Exercise';
import { ExerciseInfoType, ExerciseType } from '../../data/database.types';
import { DeleteModal } from './DeleteModal';

interface loaderData {
    initialExercises: ExerciseType[];
    options: ExerciseInfoType[];
}

interface ClientExerciseType extends ExerciseType {
    cid: string;
}

export const Workout: React.FC = () => {
    const { initialExercises, options } = useLoaderData() as loaderData;

    const state = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        console.log(showModal);
        setShowModal(!showModal);
    };

    // give exercise uuid for key management, client side only
    const clientExercises: ClientExerciseType[] = initialExercises.map(e => ({
        cid: uuid(),
        ...e,
    }));

    const [exercises, setExercises] = React.useState(clientExercises);

    const addExercise = () => {
        const newExercise: ClientExerciseType = {
            cid: uuid(),
            id: 0,
            wid: state.state.id,
            e_type_id: 1,
            sets: 3,
            reps: 10,
        };
        setExercises([...exercises, newExercise]);
    };

    const deleteExercise = (index: number) => {
        const newList = exercises.filter((_, i) => i !== index);
        setExercises(newList);
    };

    return (
        <>
            <DeleteModal
                open={showModal}
                toggleOpen={toggleModal}
                name={state.state.name}
            />
            {/* TODO: it would be nice in the future if this form would only
            submit the inputs that have changed rather than every possible
            input. Current path looks like using input disabled to stop the
            field from being submitted, but that would conflict with class
            styling from daisy */}
            <Form
                method="post"
                id="workout"
                className="flex h-full min-h-screen w-full flex-col items-center gap-6 p-6"
            >
                {/* TODO: implement a check to make sure user wants to 
                leave page with unsaved changes */}
                <div className="flex w-full justify-between">
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
                <div className="flex w-full flex-wrap justify-center gap-6">
                    {exercises.map((exercise, index) => (
                        <Exercise
                            key={exercise.cid}
                            index={index}
                            options={options}
                            id={exercise.id}
                            e_type_id={exercise.e_type_id}
                            initialSets={exercise.sets}
                            initialReps={exercise.reps}
                            onDelete={deleteExercise}
                        />
                    ))}
                </div>
                <AddCard type="button" onAdd={addExercise} />
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
