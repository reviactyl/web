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
          <Image width="24" height="24" src="/icon.png" alt="Reviactyl Icon" />
          Reviactyl
        </>
      ),
    },
    githubUrl: 'https://github.com/reviactyl/panel',
  };
}
