import { BaseButtonSize, ButtonOrLink, ButtonOrLinkProps } from '@/components/ui/button/button-or-link';
import { cva, VariantProps } from 'cva';
import { ClassValue } from 'cva/dist/types';
import { forwardRef } from 'react';

export type ButtonSize = BaseButtonSize;
export type ButtonVariant = 'contained' | 'text' | 'outlined';
export type ButtonShape = 'rounded' | 'pill';
export type ButtonColor = 'primary' | 'neutral' | 'red' | 'blue' | 'green' | 'white' | 'black' | 'orange';

const buttonClasses = cva(
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition focus:outline-none aria-disabled:pointer-events-none',
    {
        variants: {
            size: {
                xs: 'text-sm', // 40px
                sm: 'text-sm', // 40px
                md: 'text-base', // 48px
                lg: 'text-base', // 52px
            } as Record<ButtonSize, ClassValue>,
            shape: {
                pill: 'rounded-full',
                rounded: 'rounded-lg',
            } as Record<ButtonShape, ClassValue>,
            color: {
                primary: '',
                neutral: '',
                red: '',
                blue: '',
                white: '',
                black: '',
            } as Record<ButtonColor, ClassValue>,
            variant: {
                contained: '',
                text: 'border border-transparent',
                outlined: 'border',
            },
            icon: {
                true: '',
                false: '',
            },
            block: {
                true: 'w-full',
                false: '',
            },
        },
        defaultVariants: {
            size: 'md',
            shape: 'pill',
            color: 'primary',
            variant: 'contained',
            icon: false,
            block: false,
        },
        compoundVariants: [
            // region WITHOUT ICON
            { variant: ['contained'], icon: false, size: 'xs', className: 'py-2 px-6' },
            { variant: ['contained'], icon: false, size: 'sm', className: 'py-2.5 px-8' },
            { variant: ['contained'], icon: false, size: 'md', className: 'py-3 px-8' },
            { variant: ['contained'], icon: false, size: 'lg', className: 'py-3.5 px-10' },

            { variant: ['outlined', 'text'], icon: false, size: 'xs', className: 'py-1.75 px-5.75' },
            { variant: ['outlined', 'text'], icon: false, size: 'sm', className: 'py-2.25 px-7.75' },
            { variant: ['outlined', 'text'], icon: false, size: 'md', className: 'py-2.75 px-7.75' },
            { variant: ['outlined', 'text'], icon: false, size: 'lg', className: 'py-3.25 px-9.75' },
            // endregion

            // region WITH ICON
            { variant: ['contained'], icon: true, size: 'xs', className: 'p-2' },
            { variant: ['contained'], icon: true, size: 'sm', className: 'p-2.5' },
            { variant: ['contained'], icon: true, size: 'md', className: 'p-3' },
            { variant: ['contained'], icon: true, size: 'lg', className: 'p-3.5' },

            { variant: ['outlined', 'text'], icon: true, size: 'xs', className: 'p-1.75' },
            { variant: ['outlined', 'text'], icon: true, size: 'sm', className: 'p-2.25' },
            { variant: ['outlined', 'text'], icon: true, size: 'md', className: 'p-2.75' },
            { variant: ['outlined', 'text'], icon: true, size: 'lg', className: 'p-3.25' },
            // endregion

            // region CONTAINED
            {
                variant: 'contained',
                color: 'primary',
                className: 'bg-primary-400 text-white hover:bg-primary-300 active:bg-primary-500 aria-disabled:bg-neutral-200',
            },
            { variant: 'contained', color: 'neutral', className: '' },
            { variant: 'contained', color: 'red', className: '' },
            { variant: 'contained', color: 'blue', className: '' },
            { variant: 'contained', color: 'green', className: '' },
            {
                variant: 'contained',
                color: 'orange',
                className: ['bg-orange-600 hover:bg-orange-500 active:bg-orange-700 aria-disabled:text-white'],
            },
            {
                variant: 'contained',
                color: 'white',
                className: [
                    'bg-white hover:bg-neutral-200 active:bg-neutral-300 aria-disabled:bg-neutral-900 aria-disabled:text-white',
                    'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 dark:aria-disabled:bg-white dark:aria-disabled:text-neutral-900',
                ],
            },
            {
                variant: 'contained',
                color: 'black',
                className: 'bg-neutral-800 text-white hover:bg-neutral-500 active:bg-neutral-700 aria-disabled:bg-neutral-200',
            },
            // endregion

            // region OUTLINED
            {
                variant: 'outlined',
                color: 'primary',
                className: '',
            },
            {
                variant: 'outlined',
                color: 'neutral',
                className: [
                    'border-neutral-200 hover:border-primary-400 active:bg-primary-100 aria-disabled:border-neutral-400 aria-disabled:text-neutral-400',
                    'dark:border-neutral-700 dark:hover:border-primary-500 active:bg-primary-900',
                ],
            },
            {
                variant: 'outlined',
                color: 'red',
                className: [
                    'text-red-500 border-red-500 hover:bg-red-100 active:bg-red-200 aria-disabled:border-neutral-400 aria-disabled:text-neutral-400',
                    'dark:hover:bg-red-900 dark:active:bg-red-800 dark:active:text-red-400',
                ],
            },
            { variant: 'outlined', color: 'blue', className: '' },
            { variant: 'outlined', color: 'green', className: '' },
            { variant: 'outlined', color: 'white', className: '' },
            { variant: 'outlined', color: 'black', className: '' },
            // endregion

            // region TEXT
            { variant: 'text', color: 'primary', className: '' },
            {
                variant: 'text',
                color: 'neutral',
                className: [
                    'text-neutral-500 hover:bg-neutral-200 active:border-neutral-500 aria-disabled:text-neutral-400',
                    'dark:hover:bg-neutral-800',
                ],
            },
            { variant: 'text', color: 'red', className: '' },
            {
                variant: 'text',
                color: 'blue',
                className: [
                    'text-blue-500 hover:bg-blue-50 active:border-blue-500 aria-disabled:text-neutral-400',
                    'dark:hover:bg-blue-900',
                ],
            },
            {
                variant: 'text',
                color: 'green',
                className: [
                    'text-green-500 hover:bg-green-50 active:border-green-500 aria-disabled:text-neutral-400',
                    'dark:hover:bg-green-900',
                ],
            },
            { variant: 'text', color: 'white', className: '' },
            { variant: 'text', color: 'black', className: '' },
            // endregion
        ],
    },
);

export type ButtonProps = ButtonOrLinkProps & VariantProps<typeof buttonClasses>;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, forwardedRef) => {
    const { children, className, shape, color, variant, icon, block, ...buttonProps } = props;

    return (
        <ButtonOrLink
            className={buttonClasses({
                className,
                shape,
                color,
                variant,
                icon,
                block,
                size: buttonProps.size,
            })}
            {...buttonProps}
            ref={forwardedRef}
        >
            {children}
        </ButtonOrLink>
    );
});

Button.displayName = 'Button';