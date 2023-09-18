import { AuthConsumer } from '../context';
import {
    createExercise,
    createWorkout,
    deleteExercise,
    deleteWorkout,
    readExerciseInfo,
    readUserWorkouts,
    readWorkout,
    readWorkoutExercises,
    updateWorkoutAndExercises,
} from '../data/crud';
import { Exercise } from '../data/supabase/database.types';

export const useApi = () => {
    const { session } = AuthConsumer();
    const token = session?.access_token;

    return {
        readUserWorkouts: () => readUserWorkouts(token!),
        readWorkoutExercises: async (workout_id: number) =>
            readWorkoutExercises(token!, workout_id),
        readExerciseInfo: async () => readExerciseInfo(),
        readWorkout: async (workout_id: number) =>
            readWorkout(token!, workout_id),
        createWorkout: async () => createWorkout(token!),
        createExercise: async (workout_id: number) =>
            createExercise(token!, workout_id),
        deleteWorkout: async (workout_id: number) =>
            deleteWorkout(token!, workout_id),
        deleteExercise: async (exercise_id: number) =>
            deleteExercise(token!, exercise_id),
        updateWorkoutAndExercises: async (
            workout_id: number,
            name: string,
            exercises: Exercise[],
        ) => updateWorkoutAndExercises(token!, workout_id, name, exercises),
    };
};
