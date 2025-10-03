import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}

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
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Get Help',
        url: '/discord',
      },
    ],
  };
}
