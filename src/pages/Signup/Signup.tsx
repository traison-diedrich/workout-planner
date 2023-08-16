import * as React from 'react';

export const Signup: React.FC = () => {
    return (
        <div className="relative grid min-h-screen w-full place-items-center">
            <button className="btn btn-ghost btn-sm absolute right-8 top-8">
                Login
            </button>
            <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create an account</h1>
                    <p className="py-3">
                        Enter your email below to create your account
                    </p>
                </div>
                <input
                    type="text"
                    placeholder="name@example.com"
                    className="input input-bordered w-full"
                />
                <button className="btn btn-primary w-full">
                    <p>Sign In with Email</p>
                </button>
                <div className="divider w-full">OR CONTINUE WITH</div>
                <button type="button" className="btn btn-outline w-full">
                    Provider
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
