import { IconSearch, IconX } from '@tabler/icons-react';
import * as React from 'react';

interface SearchBarProps {
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    handleSearch,
    resetSearch,
}) => {
    return (
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
                        onClick={resetSearch}
                        className="btn btn-circle btn-ghost btn-sm"
                    >
                        <IconX />
                    </button>
                </div>
            </label>
        </div>
    );
};
