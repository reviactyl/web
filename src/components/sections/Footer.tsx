import Link from 'next/link';
import Image from 'next/image';
import KawaiiMode from '@/components/misc/KawaiiMode';

const links = [
    { href: 'https://github.com/sponsors/reviactyl', label: 'Sponsor (GitHub)' },
    { href: 'https://ko-fi.com/reviactyl', label: 'Ko-Fi (Sponsor)' },
    { href: '/discord', label: 'Discord Server' },
    { href: 'https://github.com/reviactyl', label: 'Github Organization' },
];

const docs = [
    { href: 'https://docs.reviactyl.app', label: 'Portal' },
    { href: 'https://docs.reviactyl.app/project', label: 'Project' },
    { href: 'https://docs.reviactyl.app/client-api', label: 'Client API' },
    { href: 'https://docs.reviactyl.app/application-api', label: 'Application API' },
];

const linkClass =
    'text-sm text-gray-400 transition-colors duration-200 hover:text-gray-50';

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-gray-50/10 bg-gray-950">
            <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
                <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-block">
                            <span className="kawaii-logo-stack inline-grid">
                                <Image src="/logo.png" alt="Reviactyl" width={200} height={50} className="col-start-1 row-start-1 h-12 w-auto kawaii-logo-normal" />
                                <Image src="/kawaii/logo.png" alt="Reviactyl" width={200} height={50} className="col-start-1 row-start-1 h-12 w-auto kawaii-logo-active" />
                            </span>
                        </Link>
                        <p className="m-0 mt-4 text-sm leading-relaxed text-gray-500">
                            Open-source, secure, and game management panel built for the modern hosts, developers and communities.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 sm:gap-16">
                        <div>
                            <h3 className="m-0 text-xs font-medium uppercase tracking-wider text-gray-500">
                                Links
                            </h3>
                            <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                                {links.map(item => (
                                    <li key={item.href}>
                                        <Link href={item.href} className={linkClass}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="m-0 text-xs font-medium uppercase tracking-wider text-gray-500">
                                Documentation
                            </h3>
                            <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                                {docs.map(item => (
                                    <li key={item.href}>
                                        <Link href={item.href} className={linkClass}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-14 border-t border-gray-50/10 pt-8">
                    <p className="m-0 text-center text-xs text-gray-500">
                        &copy; 2026 Reviactyl&trade; & Contributors. All rights reserved.
                    </p>
                    <div className="text-center"><KawaiiMode /></div>
                </div>
            </div>
        </footer>
    );
}
