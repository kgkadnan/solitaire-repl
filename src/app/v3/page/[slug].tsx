// app/v3/pages/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPagesWithSlug, getPageBySlug } from '@/features/v3/api/page';

export async function generateStaticParams() {
  const allPages = await getAllPagesWithSlug();
  return allPages.map(({ node }: any) => ({
    slug: node.slug
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getPageBySlug(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
