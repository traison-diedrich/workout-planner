import { ActionFunction, redirect } from 'react-router-dom';
import { DbResult } from './database.types';
import { supabase } from './supabaseClient';

interface workoutParams {
    wid: number;
}

export const updateWorkout: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    const exerciseData = {};

    for (const key of Object.keys(updates)) {
        if (key.startsWith('exercise-')) {
            const [, exerciseId, attribute] = key.match(
                /^exercise-(\d+)-(\w+)$/,
            );

            if (!exerciseData[exerciseId]) {
                exerciseData[exerciseId] = {};
            }

            exerciseData[exerciseId][attribute] = formData.get(key);
        }
    }

    const formattedExerciseData = Object.entries(exerciseData).map(
        ([exerciseId, data]) => ({
            id: exerciseId,
            wid: params.wid,
            sets: data['sets'],
            reps: data['reps'],
        }),
    );

    console.log('Formatted Exercise Data:', formattedExerciseData);

    const typedParams = params as unknown as workoutParams;

    const workoutQuery = supabase
        .from('workouts')
        .update({ name: updates.name.toString() })
        .eq('id', typedParams.wid);

    const workoutRes: DbResult<typeof workoutQuery> = await workoutQuery;

    const exerciseQuery = supabase
        .from('exercises')
        .upsert(formattedExerciseData);

    const exerciseRes: DbResult<typeof exerciseQuery> = await exerciseQuery;

    if (workoutRes.error) {
        console.error(workoutRes.error);
    } else if (exerciseRes.error) {
        console.error(exerciseRes.error);
    } else {
        return redirect('/workouts');
    }
};
