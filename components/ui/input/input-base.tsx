import { Label } from '@/components/ui/label/label';
import { cva } from 'cva';
import { FC, PropsWithChildren } from 'react';

export const buttonContainerClasses = cva(
    'flex w-full overflow-hidden border-b rounded-xl items-center text-sm font-medium rounded-b-none',
    {
        variants: {
            error: {
                false:
                    'border-neutral-200 dark:border-neutral-700 hover:border-primary-400 focus-within:border-primary-400 dark:hover:border-primary-600 dark:focus-within:border-primary-600',
                true: 'border-red-500 hover:border-red-500 focus-within:border-red-500',
            },
        },
        defaultVariants: { error: false },
    },
);

export type InputBaseProps = PropsWithChildren<{
    className?: string;
    label?: string;
    hint?: string;
    error?: string;
    help?: string;
}>;

export const InputBase: FC<InputBaseProps> = (props) => {
    const { children, className, label, error, help, hint } = props;

    return (
        <div className={className}>
            <label>
                <Label hint={hint} label={label}/>

                <span className={buttonContainerClasses({ error: Boolean(error) })}>{children}</span>
            </label>
            {error && (
                <span className="mt-2 block px-4 text-xs text-red-500" role={'alert'}>
          {error}
        </span>
            )}
            {help && <span className="mt-2 block px-4 text-xs text-neutral-400">{help}</span>}
        </div>
    );
};