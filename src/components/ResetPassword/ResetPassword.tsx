import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthConsumer } from '../../context';
import { ResetModal } from './ResetModal';

/**
 * This component is only necessary because of the way that supabase
 * handles password resets. When a user clicks the reset password link
 * in their email, supabase sends off both a signed_in and password_recovery
 * event which are being listened to at the AuthProvider level. This means
 * that I have no way of (as far as I know) keeping the user on a reset
 * password page at the access level like intended without the signed_in
 * event sending them elsewhere. Instead, I have to paint an optional
 * ResetPassword modal over the whole app to handle the password reset properly.
 * TLDR: supabase fires recovery and sign in for password reset, modal to
 * handle it
 */

/**
 * TODO: figure out why the modal is closing when it is not supposed to
 * rendering issue I suspect
 */
export const ResetPassword: React.FC = () => {
    const { event } = AuthConsumer();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (event === 'PASSWORD_RECOVERY') {
            setOpen(true);
        }
    }, [event]);

    return (
        <>
            <ResetModal open={open} handleClose={() => setOpen(false)} />
            <Outlet />
        </>
    );
};
