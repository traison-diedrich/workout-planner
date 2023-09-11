import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { ResetPassword } from './components';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider, ThemeProvider } from './context';
import { Access, Main } from './layouts';
import {
    AllWorkouts,
    Error,
    Home,
    Login,
    Signup,
    Welcome,
    Workout,
} from './pages';

/**
 * TODO: i hate react-router-dom and its silly forms and
 * loaders upgrade to next.js as fast as possible
 */
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="" errorElement={<Error />} element={<ResetPassword />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/access/" element={<Access />}>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
            </Route>
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
