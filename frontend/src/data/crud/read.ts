import {
    ExerciseInfoRead,
    WorkoutReadWithExercises,
} from '../supabase/database.types';

// type uid = string | undefined;

export async function readWorkouts() {
    const res = await fetch(`http://127.0.0.1:8000/workouts/`);
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutReadWithExercises[];
    }

    throw res.statusText;
}

export async function readWorkout(workout_id: number) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${workout_id}`);
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutReadWithExercises;
    }

    throw res.statusText;
}

export async function readExerciseInfo() {
    const res = await fetch('http://127.0.0.1:8000/exercise-info/');
    const data = await res.json();

    if (res.ok) {
        return data as ExerciseInfoRead[];
    }

    throw res.statusText;
}
