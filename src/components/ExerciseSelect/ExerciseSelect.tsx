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
    const [selectedExercise, setSelectedExercise] = React.useState(0);
    const searchRef = React.useRef<HTMLInputElement>(null);
    const lisRef = React.useRef<HTMLLIElement[]>([]);

    const resetScroll = () => {
        if (lisRef.current[0] !== null) {
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
        onSelect(0);
        resetScroll();
    };

    const onSelect = (index: number) => {
        if (lisRef.current[selectedExercise]) {
            const prevLi = lisRef.current[selectedExercise];
            prevLi.className = prevLi.className.replace(
                'dark:shadow-primary-focus',
                'dark:shadow-secondary-focus',
            );
        }
        setSelectedExercise(index);

        const selectedLi = lisRef.current[index];
        if (selectedLi !== null) {
            scrollTo(selectedLi);
            selectedLi.className = selectedLi.className.replace(
                'dark:shadow-secondary-focus',
                'dark:shadow-primary-focus',
            );
        }
    };

    React.useEffect(() => {
        if (open) {
            setSearchTerm('');
            setFilteredOptions(options);
            onSelect(0);
            resetScroll();
            searchRef.current?.focus();
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
                                ref={searchRef}
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
                <div className="min-h-96 relative mt-4 h-[40vh] w-full snap-y overflow-y-auto rounded-lg border border-neutral bg-base-200">
                    <div className="pointer-events-none sticky top-0 z-10 h-full w-full bg-gradient-to-t from-black via-transparent to-black opacity-0 dark:opacity-50" />
                    <ul className="absolute top-0 flex w-full flex-col items-center gap-5 px-10 py-[50%]">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    ref={el => (lisRef.current[index] = el!)}
                                    className="w-full cursor-pointer snap-center rounded bg-base-100 p-5 text-xl shadow-md transition-shadow dark:shadow-secondary-focus"
                                    onClick={() => onSelect(index)}
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="flex flex-col items-center justify-center gap-1 p-3 text-center text-lg text-warning">
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
                            if (!filteredOptions[selectedExercise]) return;
                            handleSelect(filteredOptions[selectedExercise].id);
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
