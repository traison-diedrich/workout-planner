import { AuthError } from '@supabase/supabase-js';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { sendPasswordResetEmail } from '../../data/auth';

interface ForgotModalProps {
    open: boolean;
    toggleOpen: () => void;
    setReset: () => void;
}

export const ForgotModal: React.FC<ForgotModalProps> = ({
    open,
    toggleOpen,
    setReset,
}) => {
    const [emailError, setEmailError] = React.useState<string | null>(null);

    const forgot = useMutation({
        mutationFn: (email: string) => sendPasswordResetEmail(email),
        onSuccess: () => {
            setEmailError(null);
            setReset();
            toggleOpen();
        },
        onError: (e: AuthError) => setEmailError(e.message),
    });

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!validEmail) {
            setEmailError('Please enter a valid email');
            return;
        }

        forgot.mutate(email);
    };

    return (
        <dialog open={open} className="modal">
            <div className="modal-box border border-neutral">
                <form
                    onSubmit={handleReset}
                    className="flex flex-col gap-6 p-4 sm:p-12"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Forgot password?</h2>
                        <p className="pt-3">
                            Enter your email and we'll send you instructions on
                            how to reset your password
                        </p>
                    </div>
                    <div className="form-control items-center gap-1">
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="input input-bordered input-primary w-full"
                            placeholder="name@example.com"
                        />
                        {emailError && (
                            <label className="label justify-start gap-2 text-warning">
                                <IconAlertTriangle />
                                <span className="text-sm">{emailError}</span>
                            </label>
                        )}
                    </div>
                    <div className="modal-action flex justify-center gap-8">
                        <button
                            type="button"
                            className="btn btn-error btn-outline w-2/5"
                            onClick={() => {
                                setEmailError(null);
                                toggleOpen();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-outline w-2/5"
                        >
                            {forgot.isLoading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <span>Send</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};
