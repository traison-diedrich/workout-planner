import * as React from 'react';
import { useTheme } from '../hooks/useTheme';

interface Theme {
    theme: 'wplight' | 'wpdark';
    toggleTheme: () => void;
}

const authContext = React.createContext<Theme>({} as Theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const theme = useTheme();

    return (
        <authContext.Provider value={theme}>{children}</authContext.Provider>
    );
};

export const ThemeConsumer = () => React.useContext(authContext);
