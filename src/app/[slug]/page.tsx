import { fetchThemeBySlug } from '@/lib/get-themes';
import clsx from 'clsx';
import Link from 'next/link';

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
        <div className="min-h-screen flex flex-col h-full">
            <header className="flex justify-between items-center p-8">
                <Link href="/" className="font-semibold text-neutral-500 hover:text-neutral-300">Back to themes</Link>
                <div className="flex gap-4">
                    <Link href={`/${params?.slug}`}>Desktop</Link>
                    <Link href={`/${params?.slug}?device=mobile`}>Mobile</Link>
                </div>
                <Link href={`/${params?.slug}/config`}
                      className="font-semibold text-white hover:bg-blue-400 px-4 py-2.5 rounded-2xl bg-blue-500">Start
                    with {theme?.name}</Link>
            </header>
            <main className="flex-1">
                <section className={clsx('mx-auto h-full', searchParams?.device ? 'max-w-2xl' : 'container')}>
                    <iframe src={theme?.url} className="w-full h-full bg-gray-300 rounded-lg"/>
                </section>
            </main>
        </div>
    );
}