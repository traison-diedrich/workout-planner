import * as React from 'react';

interface DeleteModalProps {
    name: string;
    open: boolean;
    toggleOpen: () => void;
    onDelete: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    name,
    open,
    toggleOpen,
    onDelete,
}) => {
    return (
        <dialog open={open} className="modal">
            <div className="modal-box border border-neutral p-5">
                <h2 className="mx-5 text-center text-xl">
                    Are you sure you want to delete <br />
                    <strong className="text-2xl">{name}?</strong>
                </h2>
                <p className="mt-2 text-center">This action cannot be undone</p>
                <div className="modal-action flex justify-center gap-8">
                    <button
                        type="button"
                        onClick={toggleOpen}
                        className="btn btn-primary btn-outline"
                    >
                        Cancel
                    </button>
                    <button onClick={onDelete} className="btn btn-error ">
                        Delete
                    </button>
                </div>
            </div>
        </dialog>
    );
};
