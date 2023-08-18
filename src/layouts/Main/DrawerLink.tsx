import { TablerIconsProps } from '@tabler/icons-react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface DrawerLinkProps {
    title: string;
    to: 'home' | 'workouts';
    onClick: () => void;
    Icon: (props: TablerIconsProps) => JSX.Element;
}

export const DrawerLink: React.FC<DrawerLinkProps> = ({
    title,
    to,
    onClick,
    Icon,
}) => {
    return (
        <li>
            <NavLink to={to} end onClick={onClick}>
                <div className="flex items-center gap-2">
                    <Icon />
                    <p className="text-lg font-bold">{title}</p>
                </div>
            </NavLink>
        </li>
    );
};
