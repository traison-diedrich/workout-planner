import { IconPlus } from '@tabler/icons-react';
import * as React from 'react';
import { Form } from 'react-router-dom';

export const AddWorkoutCard: React.FC = () => {
    return (
        <Form method="post">
            <div className="card w-96 bg-neutral shadow-xl">
                <div className="card-body">
                    <div className="card-actions justify-center">
                        <button
                            type="submit"
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
