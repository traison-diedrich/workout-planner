import {
    IconAlertTriangle,
    IconBrandGithubFilled,
    IconInfoCircle,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getSession, login, loginWith } from '../../data/auth';
import { PasswordReset } from './PasswordReset';
import WP from '/WP.svg';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    console.log(state?.signup);

    const queryClient = useQueryClient();

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
    });

    const loginMutation = useMutation({
        mutationFn: (info: { email: string; password: string }) =>
            login(info.email, info.password),
        onSuccess: () => {
            queryClient.invalidateQueries(['session']);
            navigate('/auth/home');
        },
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        loginMutation.mutate({ email: email, password: password });
    };

    const [showReset, setShowReset] = React.useState(false);

    const toggleReset = () => {
        setShowReset(!showReset);
    };

    return session?.session ? (
        <Navigate to={state?.path || '/auth/home'} replace />
    ) : (
        <div className="relative flex h-screen w-full">
            <PasswordReset open={showReset} toggleOpen={toggleReset} />
            <Link to="/signup" className="btn btn-ghost absolute right-8 top-8">
                Sign-Up
            </Link>
            <Link
                to="/"
                className="btn btn-ghost absolute left-8 top-8 z-10 flex items-center gap-2 lg:btn-neutral"
            >
                <img src={WP} alt="Workout Planner Logo" className="h-8 w-8" />
                WP
            </Link>
            <div className="relative hidden h-full w-1/2 lg:block">
                <img
                    src={gym}
                    alt="gym"
                    className="h-full w-full object-cover"
                />
                <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-end bg-opacity-20 bg-gradient-to-t from-black via-transparent to-transparent p-8">
                    <p className="mb-2 text-lg font-bold">
                        "Don't stop when you're tired. Stop when you're done."
                    </p>
                    <p className="text-sm">David Goggins</p>
                </div>
            </div>
            <div className="grid min-h-screen w-full place-items-center lg:w-1/2">
                <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">
                            Login to Workout Planner
                        </h1>
                    </div>
                    <form
                        method="post"
                        id="login"
                        className="flex w-full flex-col gap-2"
                        onSubmit={handleLogin}
                    >
                        <div className="form-control">
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex items-center p-1">
                            {loginMutation.isError && (
                                <span className="flex items-end justify-center gap-2 text-sm text-red-500">
                                    <IconAlertTriangle />
                                    Invalid email or password
                                </span>
                            )}
                            <label className="ml-auto">
                                <button
                                    type="button"
                                    className="link"
                                    onClick={toggleReset}
                                >
                                    Forgot password?
                                </button>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            {loginMutation.isLoading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                <span>Login</span>
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
                </div>
                {state?.signup && (
                    <div className="alert absolute bottom-5 w-4/5 max-w-xl bg-primary text-primary-content">
                        <span className="flex items-center gap-2">
                            <IconInfoCircle />
                            Thanks for signing up! Please confirm your email to
                            login
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
