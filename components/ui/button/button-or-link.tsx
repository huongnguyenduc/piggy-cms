import { cva, VariantProps } from 'cva';
import { ClassValue } from 'cva/dist/types';
import Link, { LinkProps } from 'next/link';
import {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    FC,
    ForwardedRef,
    forwardRef,
    Fragment,
    PropsWithChildren,
} from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------------------------------------------------ */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: undefined;
}

export interface AnchorProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
    disabled?: boolean;
}

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ButtonOrLink
 * ------------------------------------------------------------------------------------------------------------------ */

export type ButtonOrLinkProps = (ButtonProps | AnchorProps) & BaseButtonProps;

export const ButtonOrLink = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonOrLinkProps>(
    (props, forwardedRef) => {
        const { children, disabled, loading, size, ...buttonOrLinkProps } = props;
        const baseProps = { loading, children, size };
        const ghost = disabled || Boolean(loading);

        if (isAnchor(buttonOrLinkProps)) {
            return (
                <Link {...buttonOrLinkProps} ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
                      aria-disabled={ghost}>
                    <BaseButton {...baseProps} />
                </Link>
            );
        }

        return (
            <button
                {...buttonOrLinkProps}
                ref={forwardedRef as ForwardedRef<HTMLButtonElement>}
                aria-disabled={ghost}
                disabled={ghost}
                // @ts-ignore
                type={props.type ?? 'button'}
            >
                <BaseButton {...baseProps} />
            </button>
        );
    },
);

ButtonOrLink.displayName = 'ButtonOrLink';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: BaseButton
 * ------------------------------------------------------------------------------------------------------------------ */

export type BaseButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const baseButtonClasses = cva('', {
    variants: {
        size: {
            xs: 'h-4 w-4',
            sm: 'h-5 w-5',
            md: 'h-6 w-6',
            lg: 'h-6 w-6',
        } as Record<BaseButtonSize, ClassValue>,
        loading: {
            true: 'animate-spin',
        },
    },
    defaultVariants: {
        size: 'md',
        loading: false,
    },
});

export interface BaseButtonProps extends VariantProps<typeof baseButtonClasses> {
}

export const BaseButton: FC<PropsWithChildren<BaseButtonProps>> = (props) => {
    const { children, loading } = props;

    return (
        <Fragment>
            {children && (loading ? <span className="opacity-0">{children}</span> : children)}
        </Fragment>
    );
};

/* ---------------------------------------------------------------------------------------------------------------------
 * Utils
 * ------------------------------------------------------------------------------------------------------------------ */

export const isAnchor = (props: ButtonOrLinkProps): props is AnchorProps => {
    return props.href != null;
};