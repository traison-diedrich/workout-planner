import { IconAlertTriangle } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoRead } from '../../data/supabase/database.types';

interface ExercisePickerProps {
    scrollContainerRef: React.RefObject<HTMLDivElement>;
    listRef: React.RefObject<HTMLUListElement>;
    filteredOptions: ExerciseInfoRead[];
    exercisesRef: React.MutableRefObject<HTMLLIElement[]>;
    scrollTo: (element: HTMLLIElement) => void;
}

export const ExercisePicker: React.FC<ExercisePickerProps> = ({
    scrollContainerRef,
    listRef,
    filteredOptions,
    exercisesRef,
    scrollTo,
}) => {
    return (
        <div
            className="relative mt-4 h-52 w-full snap-y overflow-y-auto rounded-lg border dark:border-neutral-600"
            ref={scrollContainerRef}
        >
            {filteredOptions.length > 0 && (
                <div className="pointer-events-none sticky top-0 z-10 flex h-full w-full flex-col">
                    <div className="flex-grow bg-gray-100 opacity-40 dark:bg-black"></div>
                    <div className="h-1/4 border-b border-t border-neutral-600"></div>
                    <div className="flex-grow bg-gray-100  opacity-40 dark:bg-black"></div>
                </div>
            )}
            <ul
                className="absolute top-0 flex w-full flex-col items-center gap-5 bg-base-100 px-10 py-28"
                ref={listRef}
            >
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            ref={el => (exercisesRef.current[index] = el!)}
                            className="w-full cursor-pointer snap-center truncate text-center text-xl"
                            onClick={() =>
                                scrollTo(exercisesRef.current[index])
                            }
                        >
                            {option.name}
                        </li>
                    ))
                ) : (
                    <li className="flex snap-center flex-col items-center justify-center gap-1 text-center text-lg">
                        <span className="flex items-center gap-3">
                            <IconAlertTriangle />
                            Your search returned no results
                        </span>
                        Please try again
                    </li>
                )}
            </ul>
        </div>
    );
};
