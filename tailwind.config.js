/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'], // Added HTML file for content
    theme: {
        extend: {
            colors: {
                'company-color-primary': '#dcdcdc',
                'company-color-secondary': '#626262',
                'auth-form-color': 'rgba(0, 0, 0, 0.487)',
                '62': '#626262',
                'dc': '#dcdcdc',
                'system-white': '#f9f9f9'
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(180deg, rgba(56,108,179,1) 0%, rgba(34,74,121,1) 16%, rgba(23,217,215,1) 100%)',
                'custom-gradient2': 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                'sidebar-gradient': 'linear-gradient(180deg, rgba(56,108,179,1) 0%, rgba(34,74,121,1) 16%, rgba(23,217,215,1) 100%)',
            },

            backdropBlur: {
                'custom': '40px',
            },

            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'spin-reverse': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                leftToRight: {
                    '0%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(-22.5deg)' },
                    '50%': { transform: 'rotate(0deg)' },
                    '75%': { transform: 'rotate(22.5deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3); opacity: 0;' },
                    '50%': { transform: 'scale(1.3); opacity: 1;' },
                    '70%': { transform: 'scale(0.9); opacity: 1;' },
                    '100%': { transform: 'scale(1); opacity: 1;' },
                },
                jelloEffect: {
                    '0%': { transform: 'scale3d(1, 1, 1)' },
                    '30%': { transform: 'scale3d(0.75, 1.25, 1)' },
                    '40%': { transform: 'scale3d(1.25, 0.75, 1)' },
                    '50%': { transform: 'scale3d(0.85, 1.15, 1)' },
                    '65%': { transform: 'scale3d(1.05, 0.95, 1)' },
                    '75%': { transform: 'scale3d(0.95, 1.05, 1)' },
                    '100%': { transform: 'scale3d(1, 1, 1)' },
                },
                rotascaling: {
                    '0%': { transform: 'scale(1) rotate(0deg)', opacity: 0 },
                    '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: 0.9 },
                    '100%': { transform: 'scale(1) rotate(360deg)', opacity: 0 }
                },
                bounceInDown: {
                    '0%, 60%, 75%, 90%, to': {
                        'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                    },
                    '0%': {
                        opacity: '0',
                        transform: 'translate3d(0, -3000px, 0) scaleY(3)',
                    },
                    '60%': {
                        opacity: '1',
                        transform: 'translate3d(0, 25px, 0) scaleY(0.9)',
                    },
                    '75%': {
                        transform: 'translate3d(0, -10px, 0) scaleY(0.95)',
                    },
                    '90%': {
                        transform: 'translate3d(0, 5px, 0) scaleY(0.985)',
                    },
                    'to': {
                        transform: 'translateZ(0)',
                    },
                },
            },

            animation: {
                'spin-slow': 'spin 2s linear infinite',
                'spin-reverse': 'spin-reverse 2s linear infinite',
                'leftToRight': 'leftToRight 1s ease-in-out infinite',
                bounceIn: 'bounceIn 0.4s ease-in',
                jelloEffect: 'jelloEffect 1s ease-in-out',
                rotascaling: 'rotascaling 2s linear infinite',
                bounceInDown: 'bounceInDown 0.5s ease-in-out'
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}