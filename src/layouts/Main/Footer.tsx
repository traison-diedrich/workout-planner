import { IconHeart } from '@tabler/icons-react';
import * as React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="footer footer-center bg-base-300 p-4 text-base-content">
            <div>
                <p>Copyright &copy; Traison Diedrich 2023</p>
                <p className="inline-flex items-center gap-1">
                    Made with <IconHeart color="red" size={16} /> in Saint Louis
                </p>
            </div>
        </footer>
    );
};
