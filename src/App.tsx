import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { signup } from './data/auth';
import { createWorkout } from './data/creators';
import { deleteWorkout } from './data/deleters';
import { loadExercises, loadWorkouts } from './data/loaders';
import { updateWorkout } from './data/updaters';
import { AllWorkouts, Home, Signup, Workout } from './pages';

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
                action: updateWorkout,
            },
            {
                path: 'workouts/:wid/delete',
                action: deleteWorkout,
            },
        ],
    },
    {
        path: '/auth/signup',
        element: <Signup />,
        action: signup,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
