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
    updateWorkout,
} from '../../data/crud';
import { ExerciseType } from '../../data/supabase';
import { DeleteModal, Exercise } from './';

export type ExerciseUpdateType = {
    e_type_id: number;
    sets: number;
    reps: number;
};

/** TODO: as of right now, the workout changes will only be saved
 *  if the user clicks the save or back button. react-router-dom v6
 *  no longer supports the tools to block navigation with dirty data
 *  either create a custom useBlocker() hook to prevent navigation
 *  with unsaved changes or find a different router (most likely option)
 */
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

    const queryClient = useQueryClient();
    const { isLoading } = useQuery({
        queryKey: ['exercises', wid],
        queryFn: () => readExercises(wid),
        onSuccess: data => setExercises(data),
    });

    const creation = useMutation({
        mutationFn: () => createExercise(wid),
        onSuccess: () => {
            queryClient.invalidateQueries(['exercises']);
        },
    });

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

    return (
        <>
            <DeleteModal
                open={showModal}
                name={name}
                toggleOpen={toggleModal}
                onDelete={() => {
                    deletion.mutate();
                    navigate(-1);
                }}
            />
            <div className="flex h-full min-h-screen w-full flex-col items-center gap-6 bg-base-200 p-6">
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
                        onClick={toggleModal}
                        className="btn btn-square btn-ghost"
                    >
                        <IconTrash />
                    </button>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-6">
                    {isLoading && exercises.length > 0 ? (
                        <span className="loading loading-spinner loading-lg" />
                    ) : (
                        <>
                            {exercises?.map((exercise, index) => (
                                <Exercise
                                    key={index}
                                    options={exerciseInfo || []}
                                    exercise={exercise}
                                    setExercise={(exercise: ExerciseType) =>
                                        updateExercise(index, exercise)
                                    }
                                />
                            ))}
                            <AddCard onAdd={() => creation.mutate()} />
                        </>
                    )}
                </div>
                {!isLoading && exercises.length > 0 && (
                    <button
                        className="btn btn-primary btn-wide"
                        onClick={() => {
                            update.mutate();
                            navigate(-1);
                        }}
                    >
                        Save Workout
                    </button>
                )}
            </div>
        </>
    );
};
