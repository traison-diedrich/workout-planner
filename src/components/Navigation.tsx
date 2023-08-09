import * as React from 'react';
import { Navbar } from './Navbar';

interface NavigationProps {
    children: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({ children }) => {
    //state for open
    const [open, setOpen] = React.useState(false);

    return (
        <div className="drawer lg:drawer-open">
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={open}
                onChange={() => setOpen(!open)}
            />
            <div className="drawer-content">
                <Navbar toggleOpen={() => setOpen(!open)} />
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu h-full w-80 bg-base-200 px-4 text-base-content">
                    <li>
                        <a href={`/`}>Home</a>
                    </li>
                    <li>
                        <a href={`/workouts`}>My Workouts</a>
                    </li>
                    <li>
                        <a href={`/new`}>New Workout</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
