'use client';
// app/v3/blogs/page.tsx
import { useEffect, useState } from 'react';
import searchIcon from '@public/v3/icons/search.svg';
import Image from 'next/image';
import { getAllPostsForHome, searchPostByText } from '@/features/v3/api/blogs';
import { InputField } from '@/components/v3/input/input';
import MoreStories from '@/components/v3/more-stories';
import Layout from '@/components/v3/layout';

const fetchPosts = async () => {
  const allPosts = await getAllPostsForHome(false);
  return allPosts;
};

export default async function Page() {
  const allPosts = await fetchPosts();
  const edges = allPosts.edges;

  const allTabs = ['View All', 'News', 'Events', 'Customer Stories'];
  const [selectedTab, setSelectedTab] = useState<string>('View All');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState(edges);

  useEffect(() => {
    const fetchPost = async () => {
      const dataNew = await searchPostByText(searchText);
      setFilteredPosts(dataNew.edges);
    };
    fetchPost();
  }, [searchText]);

  useEffect(() => {
    if (!searchText) {
      if (selectedTab === 'View All') {
        setFilteredPosts(edges);
      } else {
        const filtered = edges.filter((post: any) =>
          post.node.categories.edges.some(
            (category: any) => category.node.name === selectedTab
          )
        );
        setFilteredPosts(filtered);
      }
    }
  }, [searchText, selectedTab, edges]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
          <div className="min-h-[300px] flex items-center px-[112px]">
            <div className="flex flex-wrap min-h-[160px] gap-[24px] justify-between">
              <div className="w-[600px] text-neutral900 text-headingXL font-bold">
                Discover the World of Diamonds
              </div>
              <div className="flex gap-3 flex-col w-[600px]">
                <p className="text-neutral900 text-headingS font-bold">
                  Learn, Inspire, & Empower.
                </p>
                <p className="text-neutral800 text-lRegular">
                  Stay informed with the latest trends and insights in the gem
                  and jewelry industry. Join us as we share our experiences,
                  knowledge, and understanding of diamonds.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[112px]">
          <div className="flex gap-4">
            <div className="flex h-[40px] w-full border-b-[1px] border-[#E4E7EC]">
              {allTabs.map(tab => (
                <button
                  className={`pt-[8px] px-4 text-mMedium font-medium h-[40px] ${
                    selectedTab === tab
                      ? 'text-neutral900 border-b-[2px] border-primaryMain pb-[7px] font-semiBold'
                      : 'text-neutral600 border-b-[1px] border-[#E4E7EC] pb-[8px]'
                  }`}
                  key={tab}
                  onClick={() => {
                    setSelectedTab(tab);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-2 z-10 mt-2">
                <Image src={searchIcon} alt="Search Icon" />
              </div>
              <InputField
                label=""
                onChange={e => {
                  setSearchText(e.target.value), setSelectedTab('View All');
                }}
                type="text"
                name="search"
                value={searchText}
                errorText={''}
                placeholder={'Search'}
                styles={{ inputMain: 'h-[64px] !w-[300px]', input: 'pl-8' }}
                autoComplete="none"
              />
            </div>
          </div>
          {filteredPosts.length > 0 && <MoreStories posts={filteredPosts} />}
        </div>
      </div>
    </Layout>
  );
}
