import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './context/RequireAuth';
import { signup } from './data/auth';
import { createWorkout } from './data/creators';
import { deleteWorkout } from './data/deleters';
import { loadExercises, loadWorkouts } from './data/loaders';
import { updateWorkout } from './data/updaters';
import { Main } from './layouts';
import { AllWorkouts, Home, Login, Signup, Welcome, Workout } from './pages';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} action={signup} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/auth/"
                element={
                    <RequireAuth>
                        <Main />
                    </RequireAuth>
                }
            >
                <Route path="home" element={<Home />} />
                <Route
                    path="workouts"
                    element={<AllWorkouts />}
                    loader={loadWorkouts}
                    action={createWorkout}
                />
                <Route
                    path="workouts/:wid"
                    element={<Workout />}
                    loader={loadExercises}
                    action={updateWorkout}
                />
                <Route path="workouts/:wid/delete" action={deleteWorkout} />
            </Route>
        </>,
    ),
);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
