import {
    IconLogout,
    IconMenu2,
    IconMoon,
    IconSunHigh,
    IconUser,
} from '@tabler/icons-react';
import * as React from 'react';
import { logout } from '../../data/auth';
import { useTheme } from '../../hooks';

interface NavbarProps {
    toggleOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleOpen }) => {
    const { toggleTheme } = useTheme();

    return (
        <div className="navbar sticky top-0 z-10 gap-2 bg-gradient-to-b from-base-200 from-80% to-transparent px-4">
            <div className="flex-none">
                <button
                    onClick={toggleOpen}
                    className="btn btn-square btn-ghost xl:hidden"
                >
                    <IconMenu2 />
                </button>
            </div>
            <div className="flex-1">
                <h1 className="text-xl uppercase tracking-widest xl:invisible">
                    Workout Planner
                </h1>
            </div>
            <div className="flex gap-1">
                <label className="btn btn-square btn-ghost swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} />
                    <IconSunHigh className="swap-on" />
                    <IconMoon className="swap-off" />
                </label>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-square btn-ghost">
                        <IconUser />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content rounded-box z-[1] mt-4 bg-base-100 p-2 shadow-lg dark:border dark:border-neutral dark:shadow-none"
                    >
                        <li>
                            <a onClick={() => logout()}>
                                <IconLogout />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
