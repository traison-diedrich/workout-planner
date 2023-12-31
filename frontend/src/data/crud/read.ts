import {
    ExerciseInfoRead,
    ExerciseReadWithInfo,
    WorkoutReadWithExercises,
} from '../supabase/database.types';

async function readData<T>(endpoint: string, token?: string): Promise<T> {
    const scheme = 'http://localhost:8000/';

    const res = await fetch(
        `${scheme}${endpoint}`,
        token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              }
            : undefined,
    );

    const data = await res.json();

    if (res.ok) {
        return data as T;
    }

    throw res.statusText;
}

async function readUserData<T>(endpoint: string, token: string): Promise<T> {
    return readData<T>(`users/${endpoint}`, token);
}

export async function readUserWorkouts(token: string) {
    return readUserData<WorkoutReadWithExercises[]>('workouts/', token);
}

export async function readWorkout(token: string, workoutId: number) {
    return readUserData<WorkoutReadWithExercises>(
        `workouts/${workoutId}/`,
        token,
    );
}

export async function readWorkoutExercises(token: string, workoutId: number) {
    return readUserData<ExerciseReadWithInfo[]>(
        `workouts/${workoutId}/exercises/`,
        token,
    );
}

export async function readExerciseInfo() {
    return readData<ExerciseInfoRead[]>('exercise-info/');
}
