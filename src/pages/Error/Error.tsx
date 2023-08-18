import * as React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export const Error: React.FC = () => {
    const navigate = useNavigate();
    const error = useRouteError() as { statusText: string; message: string };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="flex w-full max-w-md flex-col items-center justify-center gap-6">
                    <h1 className="text-6xl">Oops!</h1>
                    <p>We can't seem to find the page you're looking for.</p>
                    <i>Error : {error.statusText || error.message}</i>
                    <button className="btn btn-primary" onClick={goBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};
