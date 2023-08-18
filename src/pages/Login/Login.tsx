import { IconAlertTriangle, IconBrandGithubFilled } from '@tabler/icons-react';
import * as React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

export const Login: React.FC = () => {
    const [loginError, setLoginError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();
    const { login, session, loginWith } = useAuth();
    const { state } = useLocation();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        setLoading(true);
        login(email, password)
            .then(() => navigate(state?.path || '/auth/home'))
            .catch(() => {
                form.password.value = '';
                setLoginError(true);
            });
        setLoading(false);
    };

    return session?.session ? (
        <Navigate to={state?.path || '/auth/home'} replace />
    ) : (
        <div className="relative grid min-h-screen w-full place-items-center">
            <Link
                to="/signup"
                className="btn btn-ghost btn-sm absolute right-8 top-8"
            >
                Sign-Up
            </Link>
            <Link to="/" className="btn btn-ghost btn-sm absolute left-8 top-8">
                WP
            </Link>
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
                            type="text"
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
                    {loginError && (
                        <span className="flex justify-center gap-2 text-center text-sm text-red-500">
                            <IconAlertTriangle />
                            Invalid username or password
                        </span>
                    )}
                    <button type="submit" className="btn btn-primary w-full">
                        {loading ? (
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
        </div>
    );
};
