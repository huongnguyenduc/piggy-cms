import { fetchThemeBySlug } from '@/lib/get-themes';
import clsx from 'clsx';

export default async function Theme({
    params,
    searchParams,
}: {
    params: { slug: string | undefined | null },
    searchParams: { device: string | undefined | null },
}) {
    // Get slug from url
    const theme = await fetchThemeBySlug(params?.slug);

    return (
        <section className={clsx('mx-auto h-full', searchParams?.device ? 'max-w-2xl' : 'container')}>
            <iframe src={theme?.url} className="w-full h-full bg-gray-300 rounded-lg"/>
        </section>
    );
}