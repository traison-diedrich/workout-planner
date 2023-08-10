import * as React from 'react';
import { Link } from 'react-router-dom';

interface DrawerLinkProps {
    title: string;
    to: 'home' | 'workouts' | 'new';
    onClick: () => void;
}

export const DrawerLink: React.FC<DrawerLinkProps> = ({
    title,
    to,
    onClick,
}) => {
    return (
        <li>
            <Link to={to} onClick={onClick}>
                {title}
            </Link>
        </li>
    );
};
