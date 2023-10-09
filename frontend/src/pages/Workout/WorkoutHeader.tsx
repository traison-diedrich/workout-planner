import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks';

interface WorkoutHeaderProps {
    workout_id: number;
    name: string;
    openDeleteModal: () => void;
}

const DEBOUNCE_TIME_MS = 300;

export const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
    workout_id,
    name,
    openDeleteModal,
}) => {
    const navigate = useNavigate();
    const { updateWorkout } = useApi();
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (name: string) => updateWorkout(workout_id, name),
        onSuccess: () => {
            queryClient.invalidateQueries(['workouts', workout_id]);
        },
    });

    const onNameChange = React.useMemo(
        () =>
            debounce((event: React.ChangeEvent<HTMLInputElement>) => {
                update.mutate(event.target.value);
            }, DEBOUNCE_TIME_MS),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    React.useEffect(() => {
        return () => {
            onNameChange.cancel();
        };
    }, [onNameChange]);

    return (
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
                defaultValue={name}
                className="input input-bordered input-primary w-full max-w-lg text-center text-3xl"
                onChange={onNameChange}
            />
            <button
                onClick={openDeleteModal}
                className="btn btn-square btn-ghost"
            >
                <IconTrash />
            </button>
        </div>
    );
};
