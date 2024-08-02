import PostPreview from './post-preview';

export default function MoreStories({ posts }: any) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-8 gap-y-20 md:gap-y-8 my-12">
        {posts.map(({ node }: any) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
            categories={node.categories}
          />
        ))}
      </div>
    </section>
  );
}
