import { IconAlertTriangle, IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase';

interface ExerciseSelectProps {
    open: boolean;
    handleClose: () => void;
    handleSelect: (id: number) => void;
    options: ExerciseInfoType[];
}

export const ExerciseSelect: React.FC<ExerciseSelectProps> = ({
    open,
    handleClose,
    options,
    handleSelect,
}) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    React.useEffect(() => {
        if (open) {
            setSearchTerm('');
            setFilteredOptions(options);
        }
    }, [open, options]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        const filteredExercises = options.filter(option =>
            option.label.toLowerCase().includes(newSearchTerm.toLowerCase()),
        );

        setFilteredOptions(filteredExercises);
    };

    return (
        <dialog
            autoFocus
            open={open}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box p-8 sm:border sm:border-neutral">
                <div className="form-control w-full max-w-lg">
                    <label className="input-group w-full">
                        <span>
                            <IconSearch />
                        </span>
                        <div className="input input-bordered input-primary flex w-full items-center justify-between focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary">
                            <input
                                ref={input => input?.focus()}
                                type="text"
                                placeholder="Bench Press"
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
                <ul className="mt-4 h-[60vh] w-full overflow-y-auto rounded-lg border border-primary bg-base-200">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                className={`cursor-pointer p-3 text-lg ${
                                    index % 2 === 0
                                        ? 'bg-base-100'
                                        : 'bg-base-200'
                                }`}
                                key={option.id}
                                onClick={() => {
                                    handleSelect(option.id);
                                    handleClose();
                                }}
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
            <div className="modal-backdrop">
                <button onClick={handleClose}>close</button>
            </div>
        </dialog>
    );
};
