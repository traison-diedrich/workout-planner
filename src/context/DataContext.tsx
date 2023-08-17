import * as React from 'react';
import { useData } from '../hooks/useData';

import { ExerciseInfoType, ExerciseType, WorkoutType } from '../data/supabase';

interface DataAccess {
    workouts: WorkoutType[] | null;
    exerciseInfo: ExerciseInfoType[] | null;
    readWorkouts: () => Promise<void>;
    readExercises: (wid: string) => Promise<ExerciseType[] | null>;
    readExerciseInfo: () => Promise<void>;
}

const dataContext = React.createContext<DataAccess | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const data = useData();

    return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
};

export default function DataConsumer() {
    return React.useContext(dataContext);
}
