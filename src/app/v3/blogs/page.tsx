// app/v3/blogs/page.tsx
import { getAllPostsForHome } from '@/features/v3/api/blogs';
import BlogList from './blog-list';

export default async function Page() {
  const allPosts = await getAllPostsForHome(false);
  return (
    <div>
      <BlogList posts={allPosts.edges} />
    </div>
  );
}
