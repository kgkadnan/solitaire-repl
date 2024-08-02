import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPagesWithSlug, getPageBySlug } from '@/features/v3/api/page';

export default function Page({ page }: any) {
  const router = useRouter();

  // If the page is not yet generated, show a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // If the page is not found, show a 404 error
  if (!page) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const data = await getPageBySlug(params.slug);
  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      page: data
    },
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesWithSlug();
  return {
    paths: allPages.map(({ node }: any) => ({
      params: { slug: node.slug }
    })),
    fallback: true // Use true if you want to enable ISR (Incremental Static Regeneration)
  };
};
