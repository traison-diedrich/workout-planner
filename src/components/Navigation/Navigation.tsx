import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer } from './Drawer';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Navigation: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <div className="drawer xl:drawer-open">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={open}
                    onChange={toggleOpen}
                />
                <div className="drawer-content">
                    <Navbar toggleOpen={toggleOpen} />
                    <Outlet />
                </div>
                <Drawer toggleOpen={toggleOpen} />
            </div>
            <Footer />
        </>
    );
};
