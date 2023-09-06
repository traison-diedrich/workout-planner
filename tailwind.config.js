export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                scaleUp: {
                    '0%': {
                        transform: 'scale(1)',
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)',
                    },
                    '100%': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.3)',
                    },
                },
            },
            animation: {
                scaleUp: 'scaleUp .5s ease-in-out forwards',
            },
        },
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
                    primary: '#29a3dd',
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
