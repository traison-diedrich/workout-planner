import * as React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    title: string;
    wid: number;
}

export const Header: React.FC<HeaderProps> = ({ title, wid }) => {
    return (
        <div className="flex w-full">
            <h2 className="card-title">{title}</h2>
            <div className="ml-auto flex">
                <Link to={`/workouts/${wid}`} state={{ name: title }}>
                    <button className="btn btn-square btn-ghost">Edit</button>
                </Link>
            </div>
        </div>
    );
};
