import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/v3/layout';
import Container from '@/components/v3/container';
import PostTitle from '@/components/v3/post-title';
import Header from '@/components/v3/header';
import PostHeader from '@/components/v3/post-header';
import PostBody from '@/components/v3/post-body';
import Tags from '@/components/v3/tags';
import SectionSeparator from '@/components/v3/section-separator';
import MoreStories from '@/components/v3/more-stories';
import {
  getAllPostsWithSlug,
  getPostAndMorePosts
} from '@/features/v3/api/blogs';

export default function Post({ post, posts, preview }: any) {
  const router = useRouter();
  const morePosts = posts?.edges;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{`${post.title}`}</title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && (
              <div>
                {' '}
                <p className="text-neutral600 font-semiBold text-headingL">
                  From the blog
                </p>
                <p className="text-headingS text-[#475467]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <MoreStories posts={morePosts.slice(0, 4)} />
              </div>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts
    },
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }: any) => `/blogs/${node.slug}`) || [],
    fallback: true
  };
};
