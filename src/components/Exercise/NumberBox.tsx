import * as React from 'react';

interface NumberBoxProps {
    value: number;
    title: string;
}

export const NumberBox: React.FC<NumberBoxProps> = ({ value, title }) => {
    return (
        <div className="rounded border border-primary p-2 text-center">
            <p className="text-5xl">{value}</p>
            <div className="divider m-0" />
            <p className="text-sm">{title}</p>
        </div>
    );
};
