import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCard, WorkoutPreview } from '../../components';
import { getSession } from '../../data/auth';
import { createWorkout, readWorkouts } from '../../data/crud';

export const AllWorkouts: React.FC = () => {
    const queryClient = useQueryClient();

    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: getSession,
    });

    const navigate = useNavigate();

    const { data: workouts, isLoading } = useQuery({
        queryKey: ['workouts'],
        queryFn: () => readWorkouts(session?.user?.id),
        enabled: !!session?.user?.id,
    });

    const mutation = useMutation({
        mutationFn: createWorkout,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
            navigate(`/auth/workouts/${data.id}`);
        },
    });

    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-6 bg-base-200 p-6 text-center">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {isLoading ? (
                    <span className="loading loading-spinner loading-lg" />
                ) : (
                    <>
                        {workouts?.map(workout => (
                            <WorkoutPreview
                                key={workout.id}
                                wid={workout.id}
                                name={workout.name}
                            />
                        ))}
                        <AddCard
                            onAdd={() => mutation.mutate(session?.user?.id)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
