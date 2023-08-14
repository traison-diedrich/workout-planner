import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { createWorkout } from './data/creators';
import { deleteWorkout } from './data/deleters';
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
                action: createWorkout,
            },
            {
                path: 'workouts/:wid',
                element: <Workout />,
                loader: loadExercises,
            },
            {
                path: 'workouts/:wid/delete',
                action: deleteWorkout,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
