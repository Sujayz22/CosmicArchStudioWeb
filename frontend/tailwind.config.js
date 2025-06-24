/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Marquee animation classes
    'marquee-animation',
    'marquee-animation-reverse',
    'marquee-animation-vertical',
    'marquee-animation-vertical-reverse',
    'marquee-animation-paused',
    'marquee-container',
    'marquee-content',
    'marquee-hardware-accelerated',
    // Animation utilities
    'animate-marquee',
    'animate-marquee-vertical',
    // Keyframe names
    'marquee',
    'marquee-reverse',
    'marquee-vertical',
    'marquee-vertical-reverse'
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#4B654C',
  				light: '#5c7a5d',
  				dark: '#3a4e3b',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: '#FCCC51',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			neutral: {
  				DEFAULT: '#5F5F5F',
  				light: '#F2F2F0',
  				dark: '#404040'
  			},
  			white: '#FFFFFF',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)'
  			],
  			display: [
  				'var(--font-playfair)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-33.333%)'
  				}
  			},
  			'marquee-reverse': {
  				'0%': {
  					transform: 'translateX(-33.333%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			'marquee-vertical': {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(-33.333%)'
  				}
  			},
  			'marquee-vertical-reverse': {
  				'0%': {
  					transform: 'translateY(-33.333%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-reverse': 'marquee-reverse var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'marquee-vertical-reverse': 'marquee-vertical-reverse var(--duration) linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} 