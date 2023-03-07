import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: ThemeCard
 * ------------------------------------------------------------------------------------------------------------------ */

export interface ThemeCardProps extends HTMLAttributes<HTMLAnchorElement> {
    slug: string;
    name: string;
    image: string;
}

export const ThemeCard: FC<ThemeCardProps> = (props) => {
    const { children, className, name, image, slug, ...themeCardProps } = props;

    return (
        <Link href={`/${slug}`} className={clsx('cursor-pointer', className)} {...themeCardProps}>
            <div className="relative group rounded">
                <Image className="rounded" src={image} alt={name} width={1440} height={1440}/>
                <div
                    className="rounded absolute inset-0 flex justify-center items-center transition-all bg-gray-500/30 w-full h-full opacity-0 group-hover:opacity-100">
                    <button
                        className="transition-all rounded-lg px-3 py-1 translate-y-4 group-hover:translate-y-0 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white">
                        Preview
                    </button>
                </div>
            </div>
            <h3 className="font-bold text-lg mt-2">{name}</h3>
        </Link>
    );
};