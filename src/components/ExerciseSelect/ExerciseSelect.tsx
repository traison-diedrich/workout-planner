import { IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { ExerciseInfoType } from '../../data/supabase';

interface ExerciseSelectProps {
    open: boolean;
    handleClose: () => void;
    onSelect: (id: number) => void;
    options: ExerciseInfoType[];
}

export const ExerciseSelect: React.FC<ExerciseSelectProps> = ({
    open,
    handleClose,
    options,
    onSelect,
}) => {
    return (
        <dialog autoFocus open={open} className="modal">
            <div className="modal-box border border-neutral p-10">
                <button
                    className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    onClick={handleClose}
                >
                    <IconX />
                </button>
                <div className="form-control w-full max-w-lg">
                    <label className="input-group w-full">
                        <span>
                            <IconSearch />
                        </span>
                        <input
                            ref={input => input?.focus()}
                            type="text"
                            className="input input-bordered input-primary w-full"
                            placeholder="Bench Press"
                        />
                    </label>
                    <label className="label">
                        <span className="label-text">
                            Search for an exercise, muscle, or muscle group
                        </span>
                    </label>
                </div>
                <ul className="h-[60vh] w-full overflow-y-auto">
                    {options.map(option => (
                        <li
                            className="cursor-pointer p-2 hover:bg-neutral-focus"
                            key={option.id}
                            onClick={() => {
                                onSelect(option.id);
                                handleClose();
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </dialog>
    );
};
