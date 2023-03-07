import { FC, SVGProps } from 'react';
import { DefaultValues } from 'react-hook-form';

export type SVG = FC<SVGProps<SVGSVGElement>>;

export type FormOptions<T, R = {}, P = {}> = {
    defaultValues?: DefaultValues<T>;
    onSuccess?: (formData: T, response: R) => void;
    onError?: (error: any) => void;
    params?: P;
};