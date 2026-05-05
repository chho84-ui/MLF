/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-in': 'bounceIn 0.4s ease-out',
        'shake': 'shake 0.4s ease-out',
        'pulse-once': 'pulseOnce 0.6s ease-out',
        'float-up': 'floatUp 0.8s ease-out forwards',
        'star-pop': 'starPop 0.5s ease-out',
        'level-up': 'levelUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        pulseOnce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-80px)', opacity: '0' },
        },
        starPop: {
          '0%': { transform: 'scale(0) rotate(-30deg)', opacity: '0' },
          '70%': { transform: 'scale(1.3) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        levelUp: {
          '0%': { transform: 'scale(0.8) translateY(20px)', opacity: '0' },
          '60%': { transform: 'scale(1.1) translateY(-5px)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}


