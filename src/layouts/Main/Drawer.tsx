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
            <ul className="menu h-full w-60 gap-2 bg-base-100 px-4 pt-16 text-base-content">
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
