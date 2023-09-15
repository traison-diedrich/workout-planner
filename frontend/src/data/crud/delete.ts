export async function deleteWorkout(workout_id: number) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${workout_id}`, {
        method: 'DELETE',
    });

    if (res.ok) return;

    throw res.statusText;
}

export async function deleteExercise(exercise_id: number) {
    const res = await fetch(`http://127.0.0.1:8000/exercises/${exercise_id}`, {
        method: 'DELETE',
    });

    if (res.ok) return exercise_id;

    throw res.statusText;
}
