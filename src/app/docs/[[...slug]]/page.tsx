import { permanentRedirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

type PageProps = {
    params: Promise<{
        slug?: string[];
    }>;
};

export default async function DocsRedirect({ params }: PageProps) {
    const { slug = [] } = await params;

    if (slug[0] === 'development') {
        if (slug[1] === 'extensions') {
            permanentRedirect(
                'https://docs.reviactyl.app/development/extensions/getting-started'
            );
        }

        permanentRedirect('https://docs.reviactyl.app/development/');
    }

    if (
        slug[0] === 'panel' &&
        slug[1] === 'fresh-installation'
    ) {
        permanentRedirect(
            'https://docs.reviactyl.app/project/panel/getting-started'
        );
    }

    permanentRedirect(`https://docs.reviactyl.app/project/${slug.join('/')}`);
}
