import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { createWorkout } from './data/creators';
import { loadExercises, loadWorkouts } from './data/loaders';
import { AllWorkouts, EditWorkout, Home, Workout } from './pages';

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
                path: 'workouts/:wid/edit',
                element: <EditWorkout />,
                loader: loadExercises,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
