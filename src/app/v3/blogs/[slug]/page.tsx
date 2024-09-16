// app/v3/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Layout from '@/components/v3/layout';
import Container from '@/components/v3/container';
import PostHeader from '@/components/v3/post-header';
import PostBody from '@/components/v3/post-body';
import Tags from '@/components/v3/tags';
import SectionSeparator from '@/components/v3/section-separator';
// import MoreStories from '@/components/v3/more-stories';
import {
  getAllPostsWithSlug,
  getPostAndMorePosts
} from '@/features/v3/api/blogs';

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  return allPosts.edges.map(({ node }: any) => ({
    slug: node.slug
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getPostAndMorePosts(slug, false, undefined);

  if (!data?.post) {
    notFound();
  }

  const { post, posts } = data;
  // const morePosts = posts?.edges || [];

  return (
    <Layout>
      <Container>
        {/* <Header /> */}
        <div>
          <article>
            {/* <PostTitle>{post.title}</PostTitle> */}
            <div>
              <PostHeader
                title={post.title}
                // coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </div>
          </article>

          <SectionSeparator />
          {/* {morePosts.length > 0 && (
            <div>
              <p className="text-neutral600 font-semiBold text-headingL">
                From the blog
              </p>
              <p className="text-headingS text-[#475467]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <MoreStories posts={morePosts.slice(0, 4)} />
            </div>
          )} */}
        </div>
      </Container>
    </Layout>
  );
}
