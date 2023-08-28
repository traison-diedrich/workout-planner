import { IconPlus } from '@tabler/icons-react';
import * as React from 'react';

interface AddCardProps {
    onAdd?: () => void;
}

export const AddCard: React.FC<AddCardProps> = ({ onAdd }) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl sm:max-w-lg">
            <div className="grid h-full w-full place-items-center p-6">
                <button
                    onClick={onAdd}
                    className="btn btn-circle btn-ghost btn-lg"
                >
                    <IconPlus size={40} />
                </button>
            </div>
        </div>
    );
};
