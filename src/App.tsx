import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider, DataProvider } from './context';
import { signup } from './data/auth';
import { createWorkout } from './data/crud/creators';
import { deleteWorkout } from './data/crud/deleters';
import { updateWorkout } from './data/crud/updaters';
import { Main } from './layouts';
import { AllWorkouts, Home, Login, Signup, Welcome, Workout } from './pages';

// TODO: i hate react-router-dom and its silly forms and loaders
// upgrade to next.js as fast as possible
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
                    action={createWorkout}
                />
                <Route
                    path="workouts/:wid"
                    element={<Workout />}
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
            <DataProvider>
                <RouterProvider router={router} />
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
