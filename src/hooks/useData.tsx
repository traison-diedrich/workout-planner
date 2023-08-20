import * as React from 'react';
import {
    createWorkout,
    deleteWorkout,
    readExerciseInfo,
    readExercises,
    readWorkouts,
    updateWorkout,
} from '../data/crud';
import { ExerciseInfoType, ExerciseType, WorkoutType } from '../data/supabase';
import { useAuth } from './useAuth';

interface ClientWorkout extends WorkoutType {
    exercises: ExerciseType[];
}

export const useData = () => {
    const { session } = useAuth();

    const [workouts, setWorkouts] = React.useState<ClientWorkout[]>([]);
    const [exerciseInfo, setExerciseInfo] = React.useState<ExerciseInfoType[]>(
        [],
    );

    return {};
};
