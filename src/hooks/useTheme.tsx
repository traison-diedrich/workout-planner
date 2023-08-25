import * as React from 'react';

export const useTheme = () => {
    const [theme, setTheme] = React.useState<'wplight' | 'wpdark'>('wpdark');

    React.useEffect(() => {
        document
            .querySelector('html')
            ?.setAttribute('data-theme', theme.toString());
    }, [theme]);

    return {
        theme: theme,
        toggleTheme: () => {
            setTheme(theme === 'wplight' ? 'wpdark' : 'wplight');
        },
    };
};
