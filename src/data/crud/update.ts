import {
    DbResult,
    ExerciseInsertType,
    ExerciseType,
} from '../supabase/database.types';
import { supabase } from '../supabase/supabaseClient';

// TODO: this update single-handedly made me understand the need for api's
// create an api to handle the parsing and multiple queries
export async function updateWorkout(
    wid: number,
    name: string,
    exercises: ExerciseType[],
) {
    const workoutQuery = supabase
        .from('workouts')
        .update({ name: name })
        .eq('id', wid);
    const workoutRes: DbResult<typeof workoutQuery> = await workoutQuery;

    const deleteIds =
        '(' +
        exercises
            .filter(e => e.id !== undefined)
            .map(e => e.id)
            .join(', ') +
        ')';

    const deleteQuery = supabase
        .from('exercises')
        .delete()
        .eq('wid', wid)
        .not('id', 'in', deleteIds);
    const deleteRes: DbResult<typeof deleteQuery> = await deleteQuery;

    let insert: ExerciseInsertType[] = exercises.filter(
        exercise => exercise.id === 0,
    );
    insert = insert.map(exercise => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = exercise;
        return rest;
    });
    const update = exercises.filter(exercise => exercise.id !== 0);

    const updateQuery = supabase.from('exercises').upsert(update);
    const updateRes: DbResult<typeof updateQuery> = await updateQuery;

    const insertQuery = supabase.from('exercises').upsert(insert);
    const insertRes: DbResult<typeof insertQuery> = await insertQuery;

    if (
        workoutRes.error ||
        deleteRes.error ||
        updateRes.error ||
        insertRes.error
    ) {
        throw (
            workoutRes.error ||
            deleteRes.error ||
            updateRes.error ||
            insertRes.error
        );
    }
    return;
}
