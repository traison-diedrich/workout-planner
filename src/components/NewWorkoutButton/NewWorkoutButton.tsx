import * as React from 'react';
import { Form } from 'react-router-dom';

export const NewWorkoutButton: React.FC = () => {
    return (
        <Form method="post">
            <div className="card glass w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <button type="submit" className="btn">
                        New Workout
                    </button>
                </div>
            </div>
        </Form>
    );
};
