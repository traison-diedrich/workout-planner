import { IconAlertTriangle, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { resetPassword } from '../../data/auth';

interface ResetModalProps {
    open: boolean;
    handleClose: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
    open,
    handleClose,
}) => {
    const [error, setError] = React.useState<string | null>(null);
    /**
     * Using onSubmit with a form method was causing the modal to close
     * unintentionally. Using ref fixed the issue.
     */
    const resetForm = React.useRef<HTMLFormElement>(null);

    const resetMutation = useMutation({
        mutationFn: (password: string) => resetPassword(password),
        onSuccess: handleClose,
    });

    const handleReset = () => {
        const data = resetForm.current;
        if (!data) {
            return;
        }

        const pwd = data.querySelector<HTMLInputElement>(
            'input[name="password"]',
        )?.value;
        const confirmPwd = data.querySelector<HTMLInputElement>(
            'input[name="confirmPassword"]',
        )?.value;

        if (pwd!.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        } else if (pwd !== confirmPwd) {
            setError('Passwords do not match');
            return;
        } else {
            resetMutation.mutate(pwd!);
        }
    };

    return (
        <dialog open={open} className="modal">
            <div className="modal-box border border-primary">
                <button
                    className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    onClick={handleClose}
                >
                    <IconX />
                </button>
                <form
                    ref={resetForm}
                    className="flex w-full flex-col gap-2 p-6"
                >
                    <h1 className="mb-2 text-center text-3xl font-bold">
                        Set a new password
                    </h1>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        className="input input-bordered w-full"
                    />
                    <div className="flex items-center p-1">
                        {error && (
                            <span className="flex items-end justify-center gap-2 text-sm text-red-500">
                                <IconAlertTriangle />
                                {error}
                            </span>
                        )}
                    </div>
                    <div className="modal-action justify-center">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-primary btn-outline btn-wide"
                        >
                            {resetMutation.isLoading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <span>Reset Password</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};
