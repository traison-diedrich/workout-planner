import { IconMenu2 } from '@tabler/icons-react';
import * as React from 'react';

interface NavbarProps {
    toggleOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleOpen }) => {
    return (
        <div className="navbar gap-2 bg-base-100 shadow-lg">
            <div className="flex-none">
                <button
                    onClick={toggleOpen}
                    className="btn btn-square btn-ghost lg:hidden"
                >
                    <IconMenu2 />
                </button>
            </div>
            <div className="flex-1">
                <h1 className="text-xl uppercase tracking-widest">
                    Workout Planner
                </h1>
            </div>
        </div>
    );
};
