import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { readExerciseInfo } from '../../data/crud';
import { ExerciseInfoRead } from '../../data/supabase/database.types';
import { ExercisePicker, SearchBar } from './';

interface ExerciseSelectProps {
    open: boolean;
    handleClose: () => void;
    handleSelect: (new_info_id: number, exercise_name: string) => void;
}

const scrollTo = (element: HTMLLIElement) => {
    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

export const ExerciseSelect: React.FC<ExerciseSelectProps> = ({
    open,
    handleClose,
    handleSelect,
}) => {
    const { data: options } = useQuery({
        queryKey: ['exerciseInfo'],
        queryFn: readExerciseInfo,
        onSuccess: data => setFilteredOptions(data),
    });

    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredOptions, setFilteredOptions] = React.useState<
        ExerciseInfoRead[]
    >([]);
    const [scrollIndex, setScrollIndex] = React.useState(0);

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);
    const exercisesRef = React.useRef<HTMLLIElement[]>([]);

    const resetScroll = () => {
        if (exercisesRef.current[0] != null) {
            scrollTo(exercisesRef.current[0]);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredExercises = options!.filter(option =>
            option.name.toLowerCase().includes(newSearchTerm.toLowerCase()),
        );

        setFilteredOptions(filteredExercises);
        resetScroll();
    };

    const resetSearch = () => {
        setSearchTerm('');
        setFilteredOptions(options!);
        resetScroll();
    };

    React.useEffect(() => {
        if (open) {
            resetSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    /**
     * this could be more performance friendly by assigning the
     * event listener to scrollend instead of scroll
     * lacking support for scrollend event in safari
     * see: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event#browser_compatibility
     */
    React.useEffect(() => {
        const handleScroll = () => {
            if (
                !scrollContainerRef.current ||
                !listRef.current ||
                !exercisesRef.current[0].clientHeight
            )
                return;

            const scrollPosition = scrollContainerRef.current.scrollTop;
            const listStyles = getComputedStyle(listRef.current);
            const listGap = parseInt(listStyles.gap);
            const itemHeight = exercisesRef.current[0].clientHeight;
            // TODO: find a way to get the offset dynamically
            const offset = 23;

            const currentIndex = Math.floor(
                (scrollPosition - offset) / (itemHeight + listGap),
            );
            setScrollIndex(currentIndex);
        };

        let containerRefValue: HTMLDivElement | null = null;

        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('scroll', handleScroll);
            containerRefValue = scrollContainerRef.current;
        }

        return () => {
            if (containerRefValue) {
                containerRefValue.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <dialog open={open} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col items-center p-8 sm:border sm:border-neutral">
                <SearchBar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    resetSearch={resetSearch}
                />
                <ExercisePicker
                    scrollContainerRef={scrollContainerRef}
                    listRef={listRef}
                    filteredOptions={filteredOptions}
                    exercisesRef={exercisesRef}
                    scrollTo={scrollTo}
                />
                <div className="mt-4 flex w-full items-center justify-center gap-4">
                    <button
                        className="btn mt-4 w-1/3 max-w-lg"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary mt-4 w-1/3 max-w-lg"
                        onClick={() => {
                            if (!filteredOptions[scrollIndex]) return;
                            handleSelect(
                                filteredOptions[scrollIndex].id,
                                filteredOptions[scrollIndex].name,
                            );
                            handleClose();
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
            <div className="modal-backdrop">
                <button onClick={handleClose} />
            </div>
        </dialog>
    );
};
