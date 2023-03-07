import { cva } from 'cva';
import { FC, HTMLAttributes } from 'react';

const labelClasses = cva('grow text-base font-medium');

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
    label?: string;
    hint?: string;
}

export const Label: FC<LabelProps> = (props) => {
    const { label, hint, ...labelProps } = props;

    // Label is both the label and the hint
    const labelHint = label || hint;

    if (!labelHint) {
        return null;
    }

    return (
        <span className="mb-2 block flex items-baseline gap-2" {...labelProps}>
      {label && <span className={labelClasses()}>{label}</span>}
            {hint && <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">{hint}</span>}
    </span>
    );
};