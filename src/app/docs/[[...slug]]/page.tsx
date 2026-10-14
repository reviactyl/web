import { redirect } from 'next/navigation';

type PageProps = {
    params: Promise<{
        slug?: string[];
    }>;
};

export default async function DocsRedirect({ params }: PageProps) {
    const { slug = [] } = await params;

    if (slug[0] === 'development') {
        if (slug[1] === 'extensions') {
            redirect(
                'https://docs.reviactyl.app/development/extensions/getting-started'
            );
        }

        redirect('https://docs.reviactyl.app/development/');
    }

    if (
        slug[0] === 'panel' &&
        slug[1] === 'fresh-installation'
    ) {
        redirect(
            'https://docs.reviactyl.app/project/panel/getting-started'
        );
    }

    redirect(
        `https://docs.reviactyl.app/project/${slug.join('/')}`
    );
}
