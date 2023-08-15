import { IconMenu2, IconMoon, IconSunHigh } from '@tabler/icons-react';
import * as React from 'react';
import { themeChange } from 'theme-change';

interface NavbarProps {
    toggleOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleOpen }) => {
    React.useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <div className="navbar sticky top-0 z-10 gap-2 bg-base-100 px-4 shadow-lg">
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
            {/* for some reason the checkbox/swap will not work unless
                there is another component that is designed to be used
                with theme-change */}
            <button
                data-toggle-theme="dark,light"
                data-act-class="ACTIVECLASS"
                className="invisible h-0 w-0"
            />
            <label className="swap-rotate swap">
                <input
                    type="checkbox"
                    data-toggle-theme="dark,light"
                    data-act-class="ACTIVECLASS"
                />
                <IconMoon className="swap-off" />
                <IconSunHigh className="swap-on" />
            </label>
        </div>
    );
};
