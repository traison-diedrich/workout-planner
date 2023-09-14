export async function createWorkout(user_id: string) {
    const res = await fetch('http://127.0.0.1:8000/workouts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user_id }),
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw res.statusText;
}

export async function createExercise(workout_id: number) {
    const res = await fetch('http://127.0.0.1:8000/exercises/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workout_id: workout_id }),
    });
    const data = await res.json();

    if (res.ok) {
        return data;
    }

    throw res.statusText;
}
