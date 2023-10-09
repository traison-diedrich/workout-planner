import { IconPlus } from '@tabler/icons-react';
import * as React from 'react';

interface AddCardProps {
    onAdd?: () => void;
    loading?: boolean;
}

export const AddCard: React.FC<AddCardProps> = ({ onAdd, loading }) => {
    return (
        <div className="grid h-full w-full max-w-lg flex-1 place-items-center rounded-2xl bg-base-100 p-6 shadow-xl">
            {loading ? (
                <span className="loading loading-spinner loading-lg m-3" />
            ) : (
                <button
                    onClick={onAdd}
                    className="btn btn-circle btn-ghost btn-lg"
                >
                    <IconPlus size={40} />
                </button>
            )}
        </div>
    );
};
