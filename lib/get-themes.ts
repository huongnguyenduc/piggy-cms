import { cache } from 'react';

export type Theme = {
    slug: string;
    name: string;
    url: string;
    image: string;
}

export const getThemes = cache((): Theme[] => [
    {
        slug: 'ez-blog',
        name: 'EZ Wallet',
        url: 'https://ez-wallet.ghost.io/',
        image: '/images/themes/ez-blog.png',
    },
]);

export async function fetchThemes(): Promise<Theme[]> {
    return getThemes();
}

export async function fetchThemeBySlug(slug: string | undefined | null) {
    // Assuming it always return expected categories
    return getThemes().find((theme) => theme.slug === slug);
}

