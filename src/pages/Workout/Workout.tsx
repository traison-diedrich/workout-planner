import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AddCard } from '../../components';
import { ExerciseType } from '../../data/supabase/';
import { useData } from '../../hooks/useData';
import { DeleteModal, Exercise } from './';

interface ClientExerciseType extends ExerciseType {
    cid: string;
}

export type ExerciseStateType = {
    e_type_id: number;
    sets: number;
    reps: number;
};

export const Workout: React.FC = () => {
    // getting workout name through state.state.name until I can
    // figure out how to pass it down properly
    const state = useLocation();
    const navigate = useNavigate();

    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const { readExercises, exerciseInfo, deleteWorkout, updateWorkout } =
        useData();
    const [name, setName] = React.useState(state.state.name);
    const [exercises, setExercises] = React.useState<ClientExerciseType[]>([]);

    React.useEffect(() => {
        readExercises(state.state.id).then(exs => {
            const clientExs = exs
                ? exs.map(e => ({
                      cid: uuid().slice(0, 8),
                      ...e,
                  }))
                : [];
            setExercises(clientExs);
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = () => {
        deleteWorkout(state.state.id).then(() => navigate('/auth/workouts'));
    };

    const onSubmit = () => {
        const serverExercises = exercises.map(e => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { cid, ...exercise } = e;
            return exercise;
        });

        updateWorkout(state.state.id, name, serverExercises).then(() =>
            navigate('/auth/workouts'),
        );
    };

    const createExercise = () => {
        const newExercise: ClientExerciseType = {
            cid: uuid().slice(0, 8),
            id: 0,
            wid: state.state.id,
            e_type_id: 1,
            sets: 3,
            reps: 10,
        };
        setExercises([...exercises, newExercise]);
    };

    const updateExercise = (index: number, exercise: ExerciseStateType) => {
        const updatedExercises = [...exercises];
        updatedExercises[index] = {
            ...updatedExercises[index],
            ...exercise,
        };
        setExercises(updatedExercises);
    };

    const deleteExercise = (index: number) => {
        const newList = exercises.filter((_, i) => i !== index);
        setExercises(newList);
    };

    return (
        <>
            <DeleteModal
                open={showModal}
                name={state.state.name}
                toggleOpen={toggleModal}
                onDelete={onDelete}
            />
            <div className="flex h-full min-h-screen w-full flex-col items-center gap-6 p-6">
                {/* TODO: implement a check to make sure user wants to 
                leave page with unsaved changes */}
                <div className="flex w-full justify-between">
                    <button
                        onClick={onSubmit}
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
                        className="input input-bordered input-primary w-auto max-w-xs text-center text-4xl"
                        onChange={e => setName(e.target.value)}
                    />
                    <button
                        onClick={toggleModal}
                        className="btn btn-square btn-ghost"
                    >
                        <IconTrash />
                    </button>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    {exercises.map((exercise, index) => (
                        <Exercise
                            key={exercise.cid}
                            options={exerciseInfo || []}
                            id={exercise.id}
                            e_type_id={exercise.e_type_id}
                            initialSets={exercise.sets}
                            initialReps={exercise.reps}
                            onDelete={() => deleteExercise(index)}
                            setExercise={(e: ExerciseStateType) =>
                                updateExercise(index, e)
                            }
                        />
                    ))}
                </div>
                <AddCard type="button" onAdd={createExercise} />
            </div>
        </>
    );
};
