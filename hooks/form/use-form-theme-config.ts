import { FormOptions } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formThemeConfigSchema = z.object({
    name: z.string().min(4, 'Name is more than 4 characters'),
    // colorHex: z.string().min(7, 'Invalid color hex'),
    // description: z.string().min(10, 'Description is more than 10 characters'),
});

export type FormThemeConfigSchema = z.infer<typeof formThemeConfigSchema>;

const useFormThemeConfig = (options?: FormOptions<FormThemeConfigSchema>) => {
    const form = useForm<FormThemeConfigSchema>({
        resolver: zodResolver(formThemeConfigSchema),
        defaultValues: options?.defaultValues,
    });

    const onSubmit: SubmitHandler<FormThemeConfigSchema> = async (data) => {
        try {
            const result = await fetch('/api/deploy', { method: 'POST', body: JSON.stringify(data) });
            const res = await result.json();

            if (!result.ok) {
                await options?.onError?.('Something went wrong');
                return;
            }

            const redirect = res.redirect;
            if (redirect && window && window.location.pathname !== redirect) {
                window.location.href = redirect;
            }
            await options?.onSuccess?.(data, result);

            // Reset form
            form.reset();
        } catch (error) {
            await options?.onError?.(error);
        }
    };

    return { ...form, onSubmit: form.handleSubmit(onSubmit) };
};

export default useFormThemeConfig;