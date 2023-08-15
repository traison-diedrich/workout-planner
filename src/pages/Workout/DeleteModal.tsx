import * as React from 'react';
import { Form } from 'react-router-dom';

interface DeleteModalProps {
    name: string;
    open: boolean;
    toggleOpen: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    name,
    open,
    toggleOpen,
}) => {
    return (
        <dialog open={open} className="modal">
            <Form method="post" action="delete" className="modal-box">
                <h2 className="text-center text-lg font-bold">
                    Are you sure you want to delete {name}?
                </h2>
                <p className="text-center">This action cannot be undone.</p>
                <div className="modal-action flex justify-center gap-8">
                    <button
                        type="button"
                        onClick={toggleOpen}
                        className="btn btn-neutral"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-neutral">
                        Delete
                    </button>
                </div>
            </Form>
        </dialog>
    );
};
