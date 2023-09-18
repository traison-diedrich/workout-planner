async function deleteData(token: string, endpoint: string) {
    const scheme = 'http://localhost:8000/users/';

    const res = await fetch(`${scheme}${endpoint}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) return;

    throw res.statusText;
}

export async function deleteWorkout(token: string, workout_id: number) {
    return deleteData(token, `workouts/${workout_id}`);
}

export async function deleteExercise(token: string, exercise_id: number) {
    return deleteData(token, `exercises/${exercise_id}`);
}
