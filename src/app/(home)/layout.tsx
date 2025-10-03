import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout 
  {...baseOptions()} 
  links={
    [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Get Help',
        url: '/discord',
      },
    ]
  }
  >
  {children}
  </HomeLayout>;
}