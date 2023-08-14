import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface DrawerLinkProps {
    title: string;
    to: 'home' | 'workouts';
    onClick: () => void;
}

export const DrawerLink: React.FC<DrawerLinkProps> = ({
    title,
    to,
    onClick,
}) => {
    return (
        <li>
            <NavLink to={to} end onClick={onClick}>
                {title}
            </NavLink>
        </li>
    );
};
