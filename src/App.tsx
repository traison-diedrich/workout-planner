// TODO: build out app functionality in js before worrying about user context
// and database integration

import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className="h-full w-full">
                <h1 className="text-4xl">Home</h1>
            </div>
        ),
    },
    {
        path: '/workouts',
        element: (
            <div className="h-full w-full">
                <h1 className="text-4xl">My Workouts</h1>
            </div>
        ),
    },
    {
        path: '/new',
        element: (
            <div className="h-full w-full">
                <h1 className="text-4xl">New Workout</h1>
            </div>
        ),
    },
]);

function App() {
    return (
        <Navigation>
            <RouterProvider router={router} />
        </Navigation>
    );
}

export default App;
