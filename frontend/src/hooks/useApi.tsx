import { AuthConsumer } from '../context';
import {
    ExerciseInfoRead,
    ExerciseReadWithInfo,
    ExerciseUpdate,
    WorkoutRead,
    WorkoutReadWithExercises,
} from '../data/supabase/database.types';

const scheme: string = import.meta.env.VITE_API_URL;

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const useApi = () => {
    const { session } = AuthConsumer();
    const token = session?.access_token;

    async function request<T>(
        endpoint: string,
        method: method,
        body?:
            | Record<string, string | number>
            | Record<string, string | number>[],
    ): Promise<T> {
        const res = await fetch(`${scheme}${endpoint}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        const data = await res.json();

        if (res.ok) {
            return data as T;
        }

        throw res.statusText;
    }

    return {
        readUserWorkouts: () => {
            return request<WorkoutReadWithExercises[]>(
                '/users/workouts/',
                'GET',
            );
        },
        readWorkout: async (workout_id: number) => {
            return request<WorkoutReadWithExercises>(
                `/workouts/${workout_id}/`,
                'GET',
            );
        },
        readExercise: async (exercise_id: number) => {
            return request<ExerciseReadWithInfo>(
                `/exercises/${exercise_id}/`,
                'GET',
            );
        },
        readExerciseInfo: async () => {
            return request<ExerciseInfoRead[]>('/exercise-info/', 'GET');
        },
        createWorkout: async () => {
            return request<WorkoutRead>('/users/workouts/', 'POST');
        },
        createExercise: async (workout_id: number) => {
            return request<ExerciseReadWithInfo>('/users/exercises/', 'POST', {
                workout_id: workout_id,
            });
        },
        deleteWorkout: async (workout_id: number) => {
            return request<void>(`/users/workouts/${workout_id}/`, 'DELETE');
        },
        deleteExercise: async (exercise_id: number) => {
            return request<void>(`/users/exercises/${exercise_id}/`, 'DELETE');
        },
        updateWorkout: async (workout_id: number, name: string) => {
            return request<WorkoutRead>(
                `/users/workouts/${workout_id}/`,
                'PATCH',
                {
                    name: name,
                },
            );
        },
        updateExercise: async (exercise: ExerciseUpdate) => {
            return request<ExerciseReadWithInfo>(
                `/users/exercises/${exercise.id}/`,
                'PATCH',
                exercise as unknown as Record<string, string | number>,
            );
        },
        updateExercises: async (exercises: ExerciseUpdate[]) => {
            return request<ExerciseReadWithInfo[]>(
                `/users/exercises/`,
                'PATCH',
                exercises as unknown as Record<string, number>[],
            );
        },
    };
};
