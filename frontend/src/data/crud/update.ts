import {
    Exercise,
    ExerciseReadWithInfo,
    ExerciseUpdate,
    WorkoutRead,
} from '../supabase/database.types';

export async function updateWorkout(workout_id: number, name: string) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${workout_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name }),
    });
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutRead;
    }

    throw res.statusText;
}

export async function updateExercise(
    exercise_id: number,
    exercise: ExerciseUpdate,
) {
    const res = await fetch(`http://127.0.0.1:8000/exercises/${exercise_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
    });
    const data = await res.json();

    if (res.ok) {
        return data as ExerciseReadWithInfo;
    }

    throw res.statusText;
}

export async function updateWorkoutAndExercises(
    workout_id: number,
    name: string,
    exercises: Exercise[],
) {
    const exercisePromises = exercises.map((exercise, index) => {
        exercise.exercise_order = index;
        updateExercise(exercise.id!, exercise);
    });

    await Promise.all([...exercisePromises]);
    const data = await updateWorkout(workout_id, name);

    console.log(data);
    return data;
}
