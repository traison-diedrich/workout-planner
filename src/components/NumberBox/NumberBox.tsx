import * as React from 'react';

interface NumberBoxProps {
    value: number;
    title?: string;
    size: string;
}

//TODO: There is a better way to implement size here with tailwind
export const NumberBox: React.FC<NumberBoxProps> = ({ value, title, size }) => {
    return (
        <div className="rounded border border-primary p-2 text-center">
            <p className={size}>{value}</p>
            {title && (
                <>
                    <div className="divider m-0" />
                    <p className="text-sm">{title}</p>
                </>
            )}
        </div>
    );
};
