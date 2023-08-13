import * as React from 'react';
import { WorkoutPreview } from '../components/WorkoutPreview/WorkoutPreview';
import { DbResult, WorkoutType } from '../data/database.types';
import { supabase } from '../data/supabaseClient';

export const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = React.useState<WorkoutType[] | null>(null);

    React.useEffect(() => {
        const fetchWorkouts = async () => {
            const query = supabase
                .from('workouts')
                .select('*')
                .eq('uid', '0a2ee282-9aa0-4e5f-8d0a-06025d74d791');
            const res: DbResult<typeof query> = await query;

            if (res.error) {
                console.error(res.error);
            } else {
                setWorkouts(res.data);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="h-full w-full text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="grid h-full min-h-screen w-full grid-cols-1 content-evenly justify-center justify-items-center gap-6 p-4  md:grid-cols-2 xl:grid-cols-3">
                {workouts?.map(workout => (
                    <WorkoutPreview
                        key={workout.id}
                        wid={workout.id}
                        name={workout.name}
                    />
                ))}
            </div>
        </div>
    );
};
