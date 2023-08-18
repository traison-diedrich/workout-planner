import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { getSession } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // FIXME: this component will actually briefly try loading the child
    // page before redirecting to login, potential security risk
    React.useEffect(() => {
        getSession().then(session =>
            session.session
                ? null
                : navigate('/login', {
                      state: location.pathname,
                      replace: true,
                  }),
        );
    }, []);

    return children;
};
