import { InputBase, InputBaseProps } from '@/components/ui/input/input-base';
import { cva, cx, VariantProps } from 'cva';
import { ElementType, forwardRef, InputHTMLAttributes } from 'react';

const inputClasses = cva('w-full text-sm rounded-xl bg-transparent placeholder:text-neutral-400', {
    variants: {
        size: {
            sm: 'py-2.25' /* 40px */,
            md: 'py-3.5' /* 48px */,
        },
        leading: { false: 'pl-4' },
        trailing: { false: 'pr-4' },
    },
    defaultVariants: {
        size: 'md',
        leading: false,
        trailing: false,
    },
});

export type InputProps = InputBaseProps &
    Pick<VariantProps<typeof inputClasses>, 'size'> &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    trailing?: ElementType | string;
    leading?: ElementType | string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
        className,
        label,
        error,
        help,
        hint,
        size = 'md',
        leading: Leading,
        trailing,
        ...inputProps
    } = props;
    const inputBaseProps = { className, label, error, help, hint };

    return (
        <InputBase {...inputBaseProps}>
            {Leading &&
                (typeof Leading === 'string' ? (
                    <span className={'ml-4 mr-2 min-w-5 shrink-0 text-center'}>{Leading}</span>
                ) : (
                    <Leading className={'ml-4 mr-2 shrink-0'}/>
                ))}

            <input
                ref={forwardedRef}
                aria-invalid={error ? 'true' : 'false'}
                className={cx(
                    inputClasses({
                        size,
                    }),
                )}
                {...inputProps}
            />
        </InputBase>
    );
});

Input.displayName = 'Input';