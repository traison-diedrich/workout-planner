import * as React from 'react';
import {
    createWorkout,
    deleteWorkout,
    readExerciseInfo,
    readExercises,
    readWorkouts,
} from '../data/crud';
import { updateWorkout } from '../data/crud/update';
import { ExerciseInfoType, ExerciseType, WorkoutType } from '../data/supabase';
import { useAuth } from './useAuth';

export const useData = () => {
    const { getSession } = useAuth();

    const [workouts, setWorkouts] = React.useState<WorkoutType[]>([]);
    const [exerciseInfo, setExerciseInfo] = React.useState<ExerciseInfoType[]>(
        [],
    );

    return {
        workouts: workouts,
        createWorkout: async () => {
            const uid = (await getSession()).user?.id;
            createWorkout(uid)
                .then(w => {
                    setWorkouts([...workouts, w]);
                })
                .catch(e => console.error(e));
        },
        readWorkouts: async () => {
            const uid = (await getSession()).user?.id;
            readWorkouts(uid)
                .then(w => setWorkouts(w))
                .catch(e => console.error(e));
        },
        updateWorkout: async (
            wid: number,
            name: string,
            exercises: ExerciseType[],
        ) => {
            updateWorkout(wid, name, exercises)
                .then(() => readExercises(wid))
                .catch(e => console.error(e));
        },
        deleteWorkout: async (wid: number) => {
            deleteWorkout(wid)
                .then(() => {
                    setWorkouts(workouts.filter(w => w.id !== wid));
                })
                .catch(e => console.error(e));
        },
        readExercises: async (wid: number) => {
            return readExercises(wid);
        },
        exerciseInfo: exerciseInfo,
        readExerciseInfo: async () => {
            readExerciseInfo()
                .then(ei => setExerciseInfo(ei))
                .catch(e => console.error(e));
        },
    };
};
