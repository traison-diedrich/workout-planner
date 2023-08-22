import * as React from 'react';
import { supabase } from '../data/supabase';

async function handlePasswordRecovery() {
    const newPassword = prompt('What would you like your new password to be?');

    if (newPassword) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            alert('There was an error updating your password.');
        } else if (data) {
            alert('Password updated successfully!');
        }
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    React.useEffect(() => {
        supabase.auth.onAuthStateChange(event => {
            if (event == 'PASSWORD_RECOVERY') {
                handlePasswordRecovery();
            }
        });
    }, []);

    return children;
};
