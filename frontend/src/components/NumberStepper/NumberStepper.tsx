import { IconMinus, IconPlus } from '@tabler/icons-react';
import * as React from 'react';

interface NumberStepperProps {
    onAdd?: () => void;
    onSubtract?: () => void;
}

export const NumberStepper: React.FC<NumberStepperProps> = ({
    onAdd,
    onSubtract,
}) => {
    return (
        <div className="join">
            <div
                onClick={onSubtract}
                className="btn btn-primary join-item btn-sm"
            >
                <IconMinus />
            </div>
            <div onClick={onAdd} className="btn btn-primary join-item btn-sm">
                <IconPlus />
            </div>
        </div>
    );
};
