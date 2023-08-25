export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],

    daisyui: {
        themes: [
            {
                wpdark: {
                    primary: '#7ca5b8',
                    secondary: '#ec7357',
                    accent: '#c084fc',
                    neutral: '#2e3638',
                    'base-100': '#1c2122',
                    info: '#7ca5b8',
                    success: '#22c55e',
                    warning: '#fbbd23',
                    error: '#ef4444',
                },
                wplight: {
                    primary: '#7ca5b8',
                    secondary: '#ec7357',
                    accent: '#c084fc',
                    neutral: '#2e3638',
                    'base-100': '#ffffff',
                    info: '#7ca5b8',
                    success: '#22c55e',
                    warning: '#fbbd23',
                    error: '#ef4444',
                },
            },
        ],
    },
};
