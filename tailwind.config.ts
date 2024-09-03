import { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'selector',
	content: ['./app/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: '"SF Pro Text",-apple-system,system-ui,sans-serif',
			mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
		},
		extend: {
			ringColor: {
				DEFAULT: 'var(--border-primary)',
				primary: 'var(--border-primary)',
				stronger: 'var(--border-stronger)',
				lighter: 'var(--border-lighter)',
			},
			borderColor: {
				DEFAULT: 'var(--border-primary)',
				primary: 'var(--border-primary)',
				stronger: 'var(--border-stronger)',
				lighter: 'var(--border-lighter)',
			},
			textColor: {
				secondary: 'var(--text-secondary)',
			},
			backgroundColor: {
				background: 'rgb(var(--bg-background) / <alpha-value>)',
				foreground: 'rgb(var(--bg-foreground) / <alpha-value>)',
				tertiary: 'rgb(var(--bg-tertiary) / <alpha-value>)',
			},
			colors: {
				// The "contrast" color is the highest contrast: black in light mode,
				// white in dark mode.
				contrast: 'rgb(var(--text-contrast))',
				// The "default" text color is the near-primary: near-black in light,
				// and near-white in dark.
				default: 'rgb(var(--text-default))',
				background: '#000212',
				foreground: 'rgb(var(--bg-secondary) / <alpha-value>)',
				link: 'var(--color-link)',
			},
			fontSize: {
				xs: '13px',
				sm: '14px',
				base: '15px',
				lg: '18px',
				'3xl': '28px',
				'4xl': '35px',
			},
			typography: (theme: any) => ({
				// We also have md.css styling the Markdown. It's better to use it here
				// because styles here won't affect the components nested inside the Markdown.
				//
				// https://tailwindcss.com/blog/tailwindcss-typography-v0-5
				// https://github.com/tailwindlabs/tailwindcss-typography
				// https://tailwindcss-typography.vercel.app/
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: theme('colors.contrast'),
						// fontSize: theme('fontSize.base')[0],
						fontSize: '18px',
						hr: {
							borderColor: theme('borderColor.DEFAULT'),
							borderTopWidth: '2px',
							marginTop: '4em',
							marginBottom: '4em',
						},
						'h1 a, h2 a, h3 a': {
							color: 'inherit',
						},
						'h1, h2, h3': {
							color: theme('colors.contrast'),

							// letterSpacing: '-0.025em',
						},
						h1: {
							fontSize: '1.5em',
							fontWeight: '500',
							marginTop: `70px`,
							marginBottom: `.0em`,
						},
						h2: {
							fontSize: '1.25em',
							fontWeight: '400',
							marginBottom: `${1 / 3}em`,
						},
						h3: {
							fontWeight: '500',
							fontSize: '1.1em',
							marginTop: '2.4em',
							lineHeight: '1.4',
						},
						h4: {
							marginTop: '2em',
							fontSize: '1.125em',
						},
						'h1 small, h2 small, h3 small, h4 small': {
							fontFamily: theme('fontFamily.mono').join(', '),
							// color: theme('colors.gray.500'),
							fontWeight: 500,
						},
						'h2 small': {
							fontSize: theme('fontSize.lg')[0],
							...theme('fontSize.lg')[1],
						},
						'h3 small': {
							fontSize: theme('fontSize.base')[0],
							...theme('fontSize.base')[1],
						},
						'h4 small': {
							fontSize: theme('fontSize.sm')[0],
							...theme('fontSize.sm')[1],
						},
						'h1, h2, h3, h4': {
							'scroll-margin-top': '100px',
						},
						ul: {
							listStyleType: 'none',
							paddingLeft: 0,
						},
						'ul > li': {
							position: 'relative',
							paddingLeft: '1.75em !important',
						},
						'ul > li::before': {
							content: '""',
							width: '0.75em',
							height: '0.125em',
							position: 'absolute',
							top: 'calc(0.875em - 0.0625em)',
							left: 0,
							borderRadius: '999px',
							backgroundColor: theme('borderColor.stronger'),
						},
						a: {
							fontWeight: '500', // theme('fontWeight.medium'),
							textDecoration: 'none',
							// borderBottom: `1px solid rgb(var(--text-default))`,
							color: theme('colors.link'),
						},
						'a:hover': {
							borderBottomWidth: '2px',
						},
						img: {
							maxWidth: '800px',
						},
						'a code': {
							color: 'inherit',
							fontWeight: 'inherit',
						},
						strong: {
							color: theme('colors.contrast/100'),
							fontWeight: theme('fontWeight.medium'),
						},
						'a strong': {
							color: 'inherit',
							fontWeight: '500',
						},
						code: {
							fontWeight: theme('fontWeight.medium'),
							fontVariantLigatures: 'none',
						},
						pre: {
							borderRadius: '13px',
							// borderBottomRightRadius: '8px',
							// borderBottomLeftRadius: '8px',
							backgroundColor: theme('colors.gray.900'),
							padding: theme('padding.5'),
							boxShadow: theme('boxShadow.md'),
							border: `1px solid ${theme('borderColor.primary')}`,
							display: 'flex',
							fontSize: '14px',
							marginTop: `${20 / 14}em`,
							marginBottom: `${32 / 14}em`,
						},
						'p + pre': {
							marginTop: `${-4 / 14}em`,
						},
						'pre + pre': {
							marginTop: `${-16 / 14}em`,
						},
						'pre code': {
							flex: 'none',
							minWidth: '100%',
						},
						table: {
							display: 'block',
							overflow: 'auto',
							fontSize: theme('fontSize.sm'),
							lineHeight: theme('fontSize.sm')[1].lineHeight,
						},
						thead: {
							// color: theme('colors.gray.700'),
							// borderBottomColor: theme('colors.gray.200'),
						},
						'thead th': {
							paddingTop: 0,
							fontWeight: theme('fontWeight.semibold'),
							fontSize: theme('fontSize.sm'),
						},
						'tbody tr': {
							// borderBottomColor: theme('colors.gray.100'),
						},
						'tbody tr:last-child': {
							borderBottomWidth: '1px',
						},
						'tbody code': {
							fontSize: theme('fontSize.xs'),
						},
						blockquote: {
							borderLeftWidth: '4px',
							fontStyle: 'normal',
							paddingLeft: '1.5rem',
							// borderColor: theme('colors.gray.200'),
							quotes: 'none',
							// color: theme('colors.gray.700'),
							fontWeight: 'normal',
						},
					},
				},
				invert: {
					css: {
						color: theme('colors.zinc.400'),
						'h1, h2, h3, h4, thead th': {
							color: theme('colors.white'),
						},
						'h1 small, h2 small, h3 small, h4 small': {
							color: theme('colors.gray.400'),
						},
						//     code: {
						//       color: theme('colors.contrast/100'),
						//     },
						//     hr: {
						//       // borderColor: theme('colors.gray.200'),
						//       opacity: '0.05',
						//     },
						//     pre: {
						//       boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
						//     },
						//     a: {
						//       // color: theme('colors.white'),
						//       // borderBottomColor: 'rgb(var(--text-default))',
						//     },
						//     strong: {
						//       // color: theme('colors.gray.200'),
						//       fontWeight: '400',
						//     },
						//     thead: {
						//       // color: theme('colors.gray.300'),
						//       borderBottomColor: 'rgb(148 163 184 / 0.2)',
						//     },
						//     'tbody tr': {
						//       borderBottomColor: 'rgb(148 163 184 / 0.1)',
						//     },
						//     blockQuote: {
						//       // borderColor: theme('colors.gray.800'),
						//       // color: theme('colors.gray.400'),
						//     },
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
