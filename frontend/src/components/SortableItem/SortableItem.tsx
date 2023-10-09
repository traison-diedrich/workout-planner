import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import {
    AnimateLayoutChanges,
    defaultAnimateLayoutChanges,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

interface SortableItemProps {
    id: number;
    children: React.ReactNode;
}

function animateLayoutChanges(args: Parameters<AnimateLayoutChanges>[0]) {
    const { isSorting, wasDragging } = args;

    if (isSorting || wasDragging) {
        return defaultAnimateLayoutChanges(args);
    }

    return true;
}

interface SortableContextValues {
    listeners: SyntheticListenerMap | undefined;
    setActivatorNodeRef: (element: HTMLElement | null) => void;
}

export const SortableItemContext = React.createContext<SortableContextValues>({
    listeners: undefined,
    setActivatorNodeRef: () => {},
});

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
    const {
        attributes,
        setNodeRef,
        listeners,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ animateLayoutChanges, id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`${isDragging ? 'opacity-30' : ''}`}
        >
            <SortableItemContext.Provider
                value={{ listeners, setActivatorNodeRef }}
            >
                {children}
            </SortableItemContext.Provider>
        </div>
    );
};
