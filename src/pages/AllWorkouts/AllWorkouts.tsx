import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCard, WorkoutPreview } from '../../components';
import { AuthConsumer } from '../../context';
import { createWorkout, readWorkouts } from '../../data/crud';

export const AllWorkouts: React.FC = () => {
    const queryClient = useQueryClient();

    const { user } = AuthConsumer();

    const navigate = useNavigate();

    const { data: workouts, isLoading } = useQuery({
        queryKey: ['workouts'],
        queryFn: () => readWorkouts(user?.id),
    });

    const mutation = useMutation({
        mutationFn: createWorkout,
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
            navigate(`/auth/workouts/${data.id}`);
        },
    });

    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-6 bg-base-200 p-4 text-center sm:p-6">
            <h1 className="w-full text-4xl">Workouts</h1>
            <div className="m-auto grid grid-cols-1 justify-center gap-4 sm:gap-6 lg:grid-cols-2">
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
                        <AddCard onAdd={() => mutation.mutate(user?.id)} />
                    </>
                )}
            </div>
        </div>
    );
};
