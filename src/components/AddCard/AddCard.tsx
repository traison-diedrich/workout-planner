import { IconPlus } from '@tabler/icons-react';
import * as React from 'react';
import { Form } from 'react-router-dom';

interface AddCardProps {
    onAdd?: () => void;
    type: 'button' | 'submit';
}

export const AddCard: React.FC<AddCardProps> = ({ onAdd, type }) => {
    return (
        <Form method="post">
            <div className="card w-96 bg-neutral shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <button
                            onClick={onAdd}
                            type={type}
                            className="btn btn-circle btn-neutral btn-lg"
                        >
                            <IconPlus size={40} />
                        </button>
                    </div>
                </div>
            </div>
        </Form>
    );
};
