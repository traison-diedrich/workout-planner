import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider, DataProvider, ThemeProvider } from './context';
import { signup } from './data/auth';
import { Main } from './layouts';
import {
    AllWorkouts,
    Error,
    Home,
    Login,
    Signup,
    Welcome,
    Workout,
} from './pages';

// TODO: i hate react-router-dom and its silly forms and loaders
// upgrade to next.js as fast as possible
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" errorElement={<Error />}>
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
        </Route>,
    ),
);

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <DataProvider>
                    <RouterProvider router={router} />
                </DataProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
