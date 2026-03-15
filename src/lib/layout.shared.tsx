import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
        <Image
          src="/logo.png"
          alt="Reviactyl Logo"
          width={276}
          height={64}
          priority
          className="h-10 hidden dark:block w-auto"
        />
        <Image
          src="/logo-darker.png"
          alt="Reviactyl Logo"
          width={276}
          height={64}
          priority
          className="h-10 block dark:hidden w-auto"
        />
        </>
      ),
    },
    githubUrl: 'https://github.com/reviactyl/panel',
  };
}
