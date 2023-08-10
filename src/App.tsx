// TODO: build out app functionality in js before worrying about user context
// and database integration

import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Home, NewWorkout, Workouts } from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigation />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'workouts',
                element: <Workouts />,
            },
            {
                path: 'new',
                element: <NewWorkout />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
