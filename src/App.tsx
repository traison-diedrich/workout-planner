import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider, ThemeProvider } from './context';
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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TODO: i hate react-router-dom and its silly forms and loaders
// upgrade to next.js as fast as possible
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" errorElement={<Error />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
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

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
