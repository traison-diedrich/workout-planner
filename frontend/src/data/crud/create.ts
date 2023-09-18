import { ExerciseReadWithInfo, WorkoutRead } from '../supabase/database.types';

const createUserData = async <T>(
    endpoint: string,
    token: string,
    body?: Record<string, string | number>,
): Promise<T> => {
    const scheme = 'http://localhost:8000/users/';

    const res = await fetch(`${scheme}${endpoint}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });
    const data = await res.json();

    if (res.ok) {
        return data as T;
    }

    throw res.statusText;
};

export async function createWorkout(token: string) {
    return createUserData<WorkoutRead>('workouts/', token);
}

export async function createExercise(token: string, workout_id: number) {
    return createUserData<ExerciseReadWithInfo>('exercises/', token, {
        workout_id: workout_id,
    });
}
