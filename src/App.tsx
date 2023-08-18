import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider, DataProvider } from './context';
import { signup } from './data/auth';
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
                <Route path="workouts" element={<AllWorkouts />} />
                <Route path="workouts/:wid" element={<Workout />} />
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
