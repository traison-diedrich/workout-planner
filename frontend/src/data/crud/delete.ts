export async function deleteWorkout(wid: number) {
    const res = await fetch(`http://127.0.0.1:8000/workouts/${wid}`, {
        method: 'DELETE',
    });

    if (res.ok) return;

    throw res.statusText;
}
