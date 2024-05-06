import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

export type TextVariant =
	| 'h0'
	| 'h1-mono'
	| 'h1'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 's2'
	| 'pretitle'
	| 'subtitle'
	| 'body'
	| 'small'
	| 'card-body';

const textClasses = cva('relative block', {
	variants: {
		variant: {
			h0: ['text-4xl font-titles lg:text-6xl text-contrast font-medium mb-1'],
			h1: [
				'text-3xl font-titles lg:text-4xl __leading-[1.2] md:leading-normal text-contrast font-medium mb-1 font-titles tracking-[-0.6px] text-contrast',
			],
			'h1-mono':
				'text-3xl lg:text-5xl [word-spacing:-10px] leading-normal text-contrast font-titles font-mono tracking-tighter font-medium',
			subtitle: [
				'text-lg lg:text-xl text-contrast dark:font-light leading-[1.4] tracking-[.2px]',
			],
			h2: [
				'text-2xl lg:text-3xl text-contrast font-medium leading-[1.2] md:leading-snug md',
			],
			h3: ['text-xl font-normal leading-normal text-contrast'],
			pretitle: ['text-base leading-normal font-medium'],
			s2: ['text-[18px] leading-normal font-normal'],
			h4: ['text-lg text-contrast leading-normal'],
			body: ['text-base leading-normal'],
			'card-body': ['font-regular dark:text-secondary leading-normal'],
			small: 'text-sm leading-6 tracking-[.05px] ___dark:antialiased',
		},
	},
	defaultVariants: {
		variant: 'body',
	},
});

export type TextProps = ComponentProps<'span'> &
	VariantProps<typeof textClasses> & {
		children?: React.ReactNode;
	};

export const Text = ({ variant = 'body', className, ...rest }: TextProps) => {
	const classes = textClasses({ variant, className });
	return <span className={classes} {...rest} />;
};
