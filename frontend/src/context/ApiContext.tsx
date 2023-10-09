import * as React from 'react';
import { WorkoutRead } from '../data/supabase/database.types';
import { useApi } from '../hooks';

const apiContext = React.createContext<{
    readUserWorkouts: () => Promise<WorkoutRead[]>;
}>({
    readUserWorkouts: () => Promise.resolve([]),
});

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const functions = useApi();

    return (
        <apiContext.Provider value={functions}>{children}</apiContext.Provider>
    );
};

export function ApiConsumer() {
    return React.useContext(apiContext);
}
