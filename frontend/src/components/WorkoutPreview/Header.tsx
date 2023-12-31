import { IconPencil } from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    title: string;
    wid: number;
}

export const Header: React.FC<HeaderProps> = ({ title, wid }) => {
    return (
        <div className="flex max-w-full">
            <h2 className="truncate text-3xl">{title}</h2>
            <div className="ml-auto flex gap-2">
                <Link
                    to={`/auth/workouts/${wid}`}
                    state={{ name: title, id: wid }}
                >
                    <button className="btn btn-square btn-ghost">
                        <IconPencil />
                    </button>
                </Link>
            </div>
        </div>
    );
};
