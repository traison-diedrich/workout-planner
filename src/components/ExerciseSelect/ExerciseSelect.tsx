import { IconAlertTriangle, IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase';

interface ExerciseSelectProps {
    open: boolean;
    handleClose: () => void;
    handleSelect: (id: number) => void;
    options: ExerciseInfoType[];
}

const scrollTo = (element: HTMLLIElement) => {
    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
};

export const ExerciseSelect: React.FC<ExerciseSelectProps> = ({
    open,
    handleClose,
    options,
    handleSelect,
}) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [scrollIndex, setScrollIndex] = React.useState(0);

    const lisRef = React.useRef<HTMLLIElement[]>([]);

    React.useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const scrollPosition = scrollContainerRef.current.scrollTop;
                const itemHeight = lisRef.current[0].clientHeight;
                const offset = 23;

                const currentIndex = Math.floor(
                    (scrollPosition - offset) / (itemHeight + 20),
                );
                setScrollIndex(currentIndex);
            }
        };

        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener(
                'scrollend',
                handleScroll,
            );
        }

        return () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener(
                    'scrollend',
                    handleScroll,
                );
            }
        };
    }, []);

    const resetScroll = () => {
        if (lisRef.current[0] != null) {
            scrollTo(lisRef.current[0]);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredExercises = options.filter(option =>
            option.label.toLowerCase().includes(newSearchTerm.toLowerCase()),
        );

        setFilteredOptions(filteredExercises);
        resetScroll();
    };

    React.useEffect(() => {
        if (open) {
            setSearchTerm('');
            setFilteredOptions(options);
            resetScroll();
            lisRef.current = lisRef.current.slice(0, options.length);
        }
    }, [open, options]);

    return (
        <dialog
            autoFocus
            open={open}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box flex flex-col items-center p-8 sm:border sm:border-neutral">
                <div className="form-control w-full max-w-lg">
                    <label className="input-group w-full">
                        <span>
                            <IconSearch />
                        </span>
                        <div className="input input-bordered input-primary flex w-full items-center justify-between focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
                            <input
                                type="text"
                                placeholder="Search for an exercise..."
                                className="w-full border-none bg-transparent text-lg outline-none"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilteredOptions(options);
                                }}
                                className="btn btn-circle btn-ghost btn-sm"
                            >
                                <IconX />
                            </button>
                        </div>
                    </label>
                </div>
                <div
                    className="relative mt-4 h-52 w-full snap-y overflow-y-auto rounded-lg border border-neutral bg-base-200"
                    ref={scrollContainerRef}
                >
                    {filteredOptions.length > 0 && (
                        <div className="pointer-events-none sticky top-0 z-10 flex h-full w-full flex-col">
                            <div className="flex-grow bg-gray-100 opacity-40 dark:bg-black"></div>
                            <div className="h-1/4 border-b border-t border-base-content"></div>
                            <div className="flex-grow bg-gray-100  opacity-40 dark:bg-black"></div>
                        </div>
                    )}
                    <ul className="absolute top-0 flex w-full flex-col items-center gap-5 bg-base-100 px-10 py-28">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    ref={el => (lisRef.current[index] = el!)}
                                    className="w-full cursor-pointer snap-center text-center text-xl"
                                    onClick={() =>
                                        scrollTo(lisRef.current[index])
                                    }
                                >
                                    {option.label}
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
                <div className="mt-4 flex w-full items-center justify-center gap-4">
                    <button
                        className="btn btn-neutral mt-4 w-1/3 max-w-lg"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary mt-4 w-1/3 max-w-lg"
                        onClick={() => {
                            if (!filteredOptions[scrollIndex]) return;
                            handleSelect(filteredOptions[scrollIndex].id);
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
