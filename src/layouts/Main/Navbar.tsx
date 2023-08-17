import { IconMenu2, IconSunMoon } from '@tabler/icons-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { themeChange } from 'theme-change';
import useAuth from '../../context/AuthContext';

interface NavbarProps {
    toggleOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleOpen }) => {
    React.useEffect(() => {
        themeChange(false);
    }, []);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/');
            })
            .catch(() => console.error('Failed to logout'));
    };

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
            <button onClick={handleLogout} className="btn btn-square btn-ghost">
                Logout
            </button>
            {/* This button is EXTREMELY BUGGY regardless of the type */}
            <button
                data-toggle-theme="dark,light"
                data-act-class="ACTIVECLASS"
                className="btn btn-square btn-ghost"
            >
                <IconSunMoon />
            </button>
        </div>
    );
};
