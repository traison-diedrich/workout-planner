import {
    Exercise,
    ExerciseReadWithInfo,
    ExerciseUpdate,
    WorkoutRead,
} from '../supabase/database.types';

export async function updateData<T>(
    token: string,
    endpoint: string,
    body: Record<string, string | number>,
): Promise<T> {
    const scheme = 'http://localhost:8000/users/';

    const res = await fetch(`${scheme}${endpoint}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
        return data as T;
    }

    throw res.statusText;
}

export async function updateWorkout(
    token: string,
    workout_id: number,
    name: string,
) {
    return updateData<WorkoutRead>(token, `workouts/${workout_id}`, {
        name: name,
    });
}

export async function updateExercise(
    token: string,
    exercise_id: number,
    exercise: ExerciseUpdate,
) {
    return updateData<ExerciseReadWithInfo>(
        token,
        `exercises/${exercise_id}`,
        exercise as Record<string, number>,
    );
}

export async function updateWorkoutAndExercises(
    token: string,
    workout_id: number,
    name: string,
    exercises: Exercise[],
) {
    const exercisePromises = exercises.map((exercise, index) => {
        exercise.exercise_order = index;
        updateExercise(token, exercise.id!, exercise);
    });

    const workoutPromise = updateWorkout(token, workout_id, name);

    await Promise.all([...exercisePromises, workoutPromise]);

    return;
}
