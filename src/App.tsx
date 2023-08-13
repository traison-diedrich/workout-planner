// TODO: build out app functionality in js before worrying about user context
// and database integration

import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { loadExercises, loadWorkouts } from './data/loaders';
import { AllWorkouts, Home, Workout } from './pages';

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
                element: <AllWorkouts />,
                loader: loadWorkouts,
            },
            {
                path: 'workouts/:wid',
                element: <Workout />,
                loader: ({ params }) => {
                    return loadExercises(params.wid);
                },
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
