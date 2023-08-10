import * as React from 'react';
import { DrawerLink } from './DrawerLink';

interface DrawerProps {
    toggleOpen: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ toggleOpen }) => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu h-full w-80 bg-base-200 px-4 text-base-content">
                <DrawerLink title="Home" to="home" onClick={toggleOpen} />
                <DrawerLink
                    title="My Workouts"
                    to="workouts"
                    onClick={toggleOpen}
                />
                <DrawerLink title="New Workout" to="new" onClick={toggleOpen} />
            </ul>
        </div>
    );
};
