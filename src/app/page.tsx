// const inter = Inter({ subsets: ['latin'] })
import { ThemeCard } from '@/components/theme-card';
import { fetchThemes } from '@/lib/get-themes';

export default async function Home() {
    const themes = await fetchThemes();

    return (
        <main className="min-h-screen relative">
            <div className="container mx-auto space-y-16 mt-32">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-4xl">Choose a style to start.</h1>
                    <p className="text-neutral-500 mt-2">Don’t worry, you can always change this later.</p>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                    {themes.map((theme) => (
                        <ThemeCard key={theme.name} name={theme.name} image={theme.image} slug={theme.slug}/>
                    ))}
                </div>
            </div>
            <div className="h-5/6 opacity-100"></div>
        </main>
    );
}
