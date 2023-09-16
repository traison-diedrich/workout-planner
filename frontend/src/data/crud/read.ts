import {
    ExerciseInfoRead,
    ExerciseReadWithInfo,
    WorkoutRead,
} from '../supabase/database.types';

export async function readWorkouts() {
    const res = await fetch(`http://127.0.0.1:8000/workouts/`);
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutRead[];
    }

    throw res.statusText;
}

export async function readWorkout(workout_id: number) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${workout_id}`);
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutRead;
    }

    throw res.statusText;
}

export async function readUserWorkouts(token: string) {
    const res = await fetch(`http://127.0.0.1:8000/users/workouts/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();

    if (res.ok) {
        return data as WorkoutRead[];
    }

    throw res.statusText;
}

export async function readWorkoutExercises(workout_id: number) {
    const res = await fetch(
        `http://127.0.0.1:8000/workouts/${workout_id}/exercises`,
    );
    const data = await res.json();

    if (res.ok) {
        return data as ExerciseReadWithInfo[];
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
