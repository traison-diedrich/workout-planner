import { IconAlertTriangle } from '@tabler/icons-react';
import * as React from 'react';
import { DbResult, supabase } from '../../data/supabase';

interface PasswordResetProps {
    open: boolean;
    toggleOpen: () => void;
}

const passwordReset = async (email: string) => {
    const query = supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://workout-planner.fit/login',
    });
    const res: DbResult<typeof query> = await query;

    if (res.error) {
        throw res.error;
    }
};

export const PasswordReset: React.FC<PasswordResetProps> = ({
    open,
    toggleOpen,
}) => {
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!validEmail) {
            setEmailError('Please enter a valid email');
            return;
        }

        setLoading(true);
        passwordReset(email)
            .then(() => {
                form.email.value = '';
                setEmailError(null);
                toggleOpen();
            })
            .catch(e => {
                console.error(e);
                setEmailError('Something went wrong. Please try again later.');
            });
        setLoading(false);
    };

    return (
        <dialog open={open} className="modal">
            <div className="modal-box border border-primary">
                <form
                    onSubmit={handleReset}
                    className="flex flex-col gap-6 p-12"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">
                            Reset your password
                        </h2>
                        <p className="pt-3 text-sm">
                            Enter your email and we'll send you instructions on
                            how to reset your password
                        </p>
                    </div>
                    <div className="form-control gap-1">
                        <input
                            type="email"
                            name="email"
                            className="input input-bordered input-primary w-full"
                            placeholder="name@example.com"
                        />
                        {emailError && (
                            <label className="label justify-start gap-2 text-warning">
                                <IconAlertTriangle />
                                <span className="text-sm">
                                    Please enter a valid email
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="modal-action flex justify-center gap-8">
                        <button
                            type="button"
                            className="btn btn-primary btn-outline w-2/5"
                            onClick={toggleOpen}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary btn-outline w-2/5"
                        >
                            {loading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};
