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
    const { session } = useAuth();

    const [workouts, setWorkouts] = React.useState<WorkoutType[]>([]);
    const [exerciseInfo, setExerciseInfo] = React.useState<ExerciseInfoType[]>(
        [],
    );

    React.useEffect(() => {
        readExerciseInfo()
            .then(ei => setExerciseInfo(ei))
            .catch(e => console.error(e));
        if (session) {
            const uid = session?.user?.id;
            readWorkouts(uid)
                .then(w => setWorkouts(w))
                .catch(e => console.error(e));
        }
    }, [session]);

    return {
        workouts: workouts,
        createWorkout: async () => {
            const uid = session?.user?.id;
            createWorkout(uid)
                .then(w => {
                    setWorkouts([...workouts, w]);
                })
                .catch(e => console.error(e));
        },
        readWorkouts: async () => {
            const uid = session?.user?.id;
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
                .then(() => readWorkouts(session?.user?.id))
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
