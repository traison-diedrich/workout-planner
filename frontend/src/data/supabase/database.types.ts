import { PostgrestError } from '@supabase/supabase-js';

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            exercise_types: {
                Row: {
                    id: number;
                    label: string;
                };
                Insert: {
                    id?: number;
                    label: string;
                };
                Update: {
                    id?: number;
                    label?: string;
                };
                Relationships: [];
            };
            exercises: {
                Row: {
                    e_type_id: number;
                    id: number;
                    reps: number;
                    sets: number;
                    wid: number;
                    exercise_order: number;
                };
                Insert: {
                    e_type_id?: number;
                    id?: number;
                    reps?: number;
                    sets?: number;
                    wid: number;
                    exercise_order?: number;
                };
                Update: {
                    e_type_id?: number;
                    id?: number;
                    reps?: number;
                    sets?: number;
                    wid?: number;
                    exercise_order?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'exercises_e_type_id_fkey';
                        columns: ['e_type_id'];
                        referencedRelation: 'exercise_types';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'exercises_wid_fkey';
                        columns: ['wid'];
                        referencedRelation: 'workouts';
                        referencedColumns: ['id'];
                    },
                ];
            };
            workouts: {
                Row: {
                    created_at: string | null;
                    id: number;
                    name: string;
                    uid: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id?: number;
                    name?: string;
                    uid?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: number;
                    name?: string;
                    uid?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'workouts_uid_fkey';
                        columns: ['uid'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export type WorkoutType = Database['public']['Tables']['workouts']['Row'];
export type ExerciseType = Database['public']['Tables']['exercises']['Row'];
export type ExerciseInsertType =
    Database['public']['Tables']['exercises']['Insert'];
export type ExerciseInfoType =
    Database['public']['Tables']['exercise_types']['Row'];

export type ClientExercise = ExerciseType & {
    exercise_types: ExerciseInfoType;
};

export type ClientWorkout = WorkoutType & {
    exercises: ClientExercise[];
};

export type DbResultErr = PostgrestError;
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
    ? Exclude<U, null>
    : never;

// ExerciseInfoBase
export interface ExerciseInfoBase {
    name: string;
}

// ExerciseInfo
export interface ExerciseInfo extends ExerciseInfoBase {
    id: number | null;
}

// ExerciseInfoCreate
export interface ExerciseInfoCreate extends ExerciseInfoBase {}

// ExerciseInfoRead
export interface ExerciseInfoRead extends ExerciseInfoBase {
    id: number;
}

// ExerciseInfoUpdate
export interface ExerciseInfoUpdate {
    name: string;
}

// WorkoutBase
export interface WorkoutBase {
    name: string;
    user_id: string;
}

// Workout
export interface Workout extends WorkoutBase {
    id: number | null;
    exercises: Exercise[];
}

// WorkoutCreate
export interface WorkoutCreate extends WorkoutBase {}

// WorkoutRead
export interface WorkoutRead extends WorkoutBase {
    id: number;
}

// WorkoutUpdate
export interface WorkoutUpdate {
    name?: string | null;
}

// ExerciseBase
export interface ExerciseBase {
    sets: number;
    reps: number;
    exercise_order: number;
    workout_id: number;
    exercise_info_id: number;
}

// Exercise
export interface Exercise extends ExerciseBase {
    id: number | null;
    workout?: Workout | null;
    exercise_info?: ExerciseInfo | null;
}

// ExerciseCreate
export interface ExerciseCreate extends ExerciseBase {}

// ExerciseRead
export interface ExerciseRead extends ExerciseBase {
    id: number;
}

// ExerciseUpdate
export interface ExerciseUpdate {
    sets?: number;
    reps?: number;
    exercise_order?: number;
    exercise_info_id?: number;
}

// ExerciseReadWithInfo
export interface ExerciseReadWithInfo extends ExerciseRead {
    exercise_info: ExerciseInfoRead;
}

// WorkoutReadWithExercises
export interface WorkoutReadWithExercises extends WorkoutRead {
    exercises: ExerciseReadWithInfo[];
}
