import * as React from 'react';
import { readExerciseInfo, readExercises, readWorkouts } from '../data/crud';
import { ExerciseInfoType, WorkoutType } from '../data/supabase';
import { useAuth } from './useAuth';

export const useData = () => {
    const { getSession } = useAuth();

    const [workouts, setWorkouts] = React.useState<WorkoutType[] | null>([]);
    const [exerciseInfo, setExerciseInfo] = React.useState<
        ExerciseInfoType[] | null
    >([]);

    return {
        workouts: workouts,
        readWorkouts: async () => {
            const uid = (await getSession()).user?.id;
            readWorkouts(uid)
                .then(w => setWorkouts(w))
                .catch(e => console.error(e));
        },
        exerciseInfo: exerciseInfo,
        readExercises: async (wid: string) => {
            return readExercises(wid);
        },
        readExerciseInfo: async () => {
            readExerciseInfo()
                .then(ei => setExerciseInfo(ei))
                .catch(e => console.error(e));
        },
    };
};
