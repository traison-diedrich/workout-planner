import { ActionFunction, redirect } from 'react-router-dom';
import { Database, DbResult } from '../supabase/database.types';
import { supabase } from '../supabase/supabaseClient';

interface workoutParams {
    wid: number;
}

// TODO: this update single-handedly made me understand the need for api's
// create an api to handle the parsing and multiple queries
export const updateWorkout: ActionFunction = async ({ request, params }) => {
    {
        /*
    TODO: there has to be a better way of grouping/nesting form data together
    than parsing it like this. Look into form libraries like react-hook-form
    or formik to see if they have options
    */
    }

    const typedParams = params as unknown as workoutParams;

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    type InsertExerciseType =
        Database['public']['Tables']['exercises']['Insert'];

    const exerciseData: InsertExerciseType[] = [];

    for (const key of Object.keys(updates)) {
        if (key.startsWith('exercise-')) {
            const [, exerciseIndex, exerciseId, attribute] = key.match(
                /^exercise-(\d+)-(\d+)-(\w+)$/,
            );

            if (!exerciseData[exerciseIndex]) {
                exerciseData.push({
                    wid: typedParams.wid,
                } as InsertExerciseType);
            }

            if (exerciseId !== '0' && !exerciseData[exerciseIndex]['id']) {
                exerciseData[exerciseIndex]['id'] = exerciseId;
            }

            exerciseData[exerciseIndex][attribute] = updates[key];
        }
    }

    const hasId: InsertExerciseType[] = exerciseData.filter(
        e => e.id !== undefined,
    );
    const noId: InsertExerciseType[] = exerciseData.filter(
        e => e.id === undefined,
    );

    const workoutQuery = supabase
        .from('workouts')
        .update({ name: updates.name.toString() })
        .eq('id', typedParams.wid);
    const workoutRes: DbResult<typeof workoutQuery> = await workoutQuery;

    const deleteIds =
        '(' +
        exerciseData
            .filter(e => e.id !== undefined)
            .map(e => e.id)
            .join(', ') +
        ')';

    const deleteQuery = supabase
        .from('exercises')
        .delete()
        .eq('wid', typedParams.wid)
        .not('id', 'in', deleteIds);
    const deleteRes: DbResult<typeof deleteQuery> = await deleteQuery;

    // supabase wont handle id and id-less upserts in the same query
    const idQuery = supabase.from('exercises').upsert(hasId);
    const idRes: DbResult<typeof idQuery> = await idQuery;

    const noIdQuery = supabase.from('exercises').upsert(noId);
    const noIdRes: DbResult<typeof noIdQuery> = await noIdQuery;

    if (workoutRes.error || deleteRes.error || idRes.error || noIdRes.error) {
        console.error(
            workoutRes.error || deleteRes.error || idRes.error || noIdRes.error,
        );
        return redirect('/auth/workouts');
    } else {
        return redirect('/auth/workouts');
    }
};
