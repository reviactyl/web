import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import Navbar from './Navbar';

export default function Layout({ children }: LayoutProps<'/'>) {
  const base = baseOptions();
  return <HomeLayout 
  {...base} 
  links={
    [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Demo',
        url: 'https://demo.reviactyl.dev/',
      },
      {
        text: 'Blog',
        url: '/blog',
      },
      {
        text: 'Get Help',
        url: '/discord',
      },
    ]
  }
  nav={{
    ...base.nav,
    component: <Navbar />,
  }}
  >
  {children}
  </HomeLayout>;
}