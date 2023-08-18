import { IconAlertTriangle, IconBrandGithubFilled } from '@tabler/icons-react';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Signup: React.FC = () => {
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();
    const { signup, loginWith } = useAuth();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validPassword = password.length > 5;

        if (!validEmail) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        if (!validPassword) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);

        setLoading(true);
        signup(email, password).then(() => navigate('/login'));
    };

    return (
        <div className="relative grid min-h-screen w-full place-items-center">
            <Link
                to="/login"
                className="btn btn-ghost btn-sm absolute right-8 top-8"
            >
                Login
            </Link>
            <Link to="/" className="btn btn-ghost btn-sm absolute left-8 top-8">
                WP
            </Link>
            <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="py-3">
                        Enter your email below to create your account
                    </p>
                </div>
                <form
                    method="post"
                    id="signup"
                    className="flex w-full flex-col gap-2"
                    onSubmit={onSubmit}
                >
                    <div className="form-control">
                        <input
                            type="text"
                            name="email"
                            placeholder="name@example.com"
                            className="input input-bordered w-full"
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
                    <div className="form-control">
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input input-bordered w-full"
                        />
                        {passwordError && (
                            <label className="label justify-start gap-2 text-warning">
                                <IconAlertTriangle />
                                <span className="text-sm">
                                    Please enter a password with at least 6
                                    characters
                                </span>
                            </label>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        {loading ? (
                            <span className="loading loading-spinner" />
                        ) : (
                            <span>Sign Up With Email</span>
                        )}
                    </button>
                </form>
                <div className="divider w-full">OR CONTINUE WITH</div>
                <button
                    onClick={() => loginWith('github')}
                    type="button"
                    className="btn btn-outline w-full"
                >
                    <IconBrandGithubFilled />
                    Github
                </button>
                <div className="text-center">
                    <p className="py-3 text-sm">
                        By clicking continue, you agree to absolutely nothing
                    </p>
                </div>
            </div>
        </div>
    );
};
