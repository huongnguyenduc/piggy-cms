// const inter = Inter({ subsets: ['latin'] })
'use client';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import useFormThemeConfig from '@/hooks/form/use-form-theme-config';
import Link from 'next/link';

export default function ThemeConfig({
    params,
}: {
    params: { slug: string | undefined | null },
}) {

    const {
        register,
        formState: { isSubmitting, errors },
        onSubmit,
    } = useFormThemeConfig({
        onSuccess: async () => {

        },
        onError: () => {
        },
    });

    return (
        <main className="min-h-screen relative">
            <header className="flex justify-between items-center p-8">
                <Link href={`/${params?.slug}`} className="font-semibold text-neutral-500 hover:text-neutral-300">Back
                    to themes</Link>
            </header>
            <div className="max-w-xl mx-auto space-y-16 mt-32">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-4xl">Set up your new site.</h1>
                    <p className="text-neutral-500 mt-2">Don’t worry, you can always change this later.</p>
                </div>
                <div className="mt-8">
                    <form onSubmit={onSubmit}>
                        <div className="space-y-7.5">
                            <Input
                                autoFocus={true}
                                error={errors.name?.message}
                                label={'Site domain'}
                                placeholder={'codelight'}
                                {...register('name')}
                            />
                            {/* <Input */}
                            {/*     error={errors.colorHex?.message} */}
                            {/*     label={'Brand color'} */}
                            {/*     placeholder={'#000000'} */}
                            {/*     {...register('colorHex')} */}
                            {/* /> */}
                            {/* <Input */}
                            {/*     error={errors.description?.message} */}
                            {/*     label={'Description'} */}
                            {/*     placeholder={'Describe your site in a few words'} */}
                            {/*     {...register('description')} */}
                            {/* /> */}
                        </div>
                        <Button block className={'mt-7.5'} loading={isSubmitting} size={'lg'} type={'submit'}>
                            {'Continue'}
                        </Button>
                        <div className="mt-4 font-semibold">{isSubmitting ? 'Creating your page...' : ''}</div>
                    </form>
                </div>
            </div>
        </main>
    );
}