import { IconHome, IconWeight } from '@tabler/icons-react';
import * as React from 'react';
import { DrawerLink } from './DrawerLink';

interface DrawerProps {
    toggleOpen: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ toggleOpen }) => {
    return (
        <div className="drawer-side z-50">
            <label htmlFor="my-drawer" className="drawer-overlay" />
            <ul className="menu h-full gap-2 bg-base-100 px-4 pt-16 text-base-content xl:pt-4">
                <h1 className="text-bold mb-4 hidden text-xl uppercase tracking-widest xl:block">
                    Workout Planner
                </h1>
                <DrawerLink
                    Icon={IconHome}
                    title="Home"
                    to="home"
                    onClick={toggleOpen}
                />
                <DrawerLink
                    Icon={IconWeight}
                    title="My Workouts"
                    to="workouts"
                    onClick={toggleOpen}
                />
            </ul>
        </div>
    );
};
