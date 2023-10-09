import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks';

interface DeleteModalProps {
    name: string;
    workout_id: number;
    open: boolean;
    toggleOpen: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    name,
    workout_id,
    open,
    toggleOpen,
}) => {
    const { deleteWorkout } = useApi();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deletion = useMutation({
        mutationFn: () => deleteWorkout(workout_id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workouts'],
            });
            navigate(-1);
        },
    });

    return (
        <dialog open={open} className="modal">
            <div className="modal-box border border-neutral p-5">
                <h2 className="mx-5 text-center text-xl">
                    Are you sure you want to delete <br />
                    <strong className="text-2xl">{name}?</strong>
                </h2>
                <p className="mt-2 text-center">This action cannot be undone</p>
                <div className="modal-action flex justify-center gap-8">
                    <button
                        type="button"
                        onClick={toggleOpen}
                        className="btn btn-primary btn-outline"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => deletion.mutate()}
                        className="btn btn-error "
                    >
                        {deletion.isLoading ? (
                            <span className="loading loading-spinner mx-3" />
                        ) : (
                            <span>Delete</span>
                        )}
                    </button>
                </div>
            </div>
        </dialog>
    );
};
