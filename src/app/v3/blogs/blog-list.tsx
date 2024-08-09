// app/v3/blogs/BlogList.tsx
'use client'; // This is a client component

import { useEffect, useState } from 'react';
import searchIcon from '@public/v3/icons/search.svg';
import Image from 'next/image';
import { InputField } from '@/components/v3/input/input';
import MoreStories from '@/components/v3/more-stories';
import { searchPostByText } from '@/features/v3/api/blogs';
import AnimationSection from '@/components/v3/animated-text/scroll';

const BlogList = ({ posts }: { posts: any[] }) => {
  const allTabs = ['View All', 'News', 'Events', 'Customer Stories'];
  const [selectedTab, setSelectedTab] = useState<string>('View All');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

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
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter((post: any) =>
          post.node.categories.edges.some(
            (category: any) => category.node.name === selectedTab
          )
        );
        setFilteredPosts(filtered);
      }
    }
  }, [searchText, selectedTab, posts]);

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="min-h-[300px] flex items-center">
          <div className="flex flex-wrap flex-col gap-14 pt-[180px] pb-[80px] flex-wrap min-h-[160px] justify-between">
            <div className=" text-neutral900 text-[96px] font-bold text-center line leading-[100px] flowy-animate">
              <AnimationSection>
                {' '}
                Discover the World of Diamonds
              </AnimationSection>
            </div>
            <div className="flex gap-3">
              <p className="text-neutral900 text-[28px] font-bold w-1/2">
                <AnimationSection>Learn, Inspire, & Empower. </AnimationSection>
              </p>

              <p className="text-neutral800 text-lRegular w-1/2 px-4 pt-[14px]">
                {' '}
                <AnimationSection>
                  Stay informed with the latest trends and insights in the gem
                  and jewelry industry. Join us as we share our experiences,
                  knowledge, and understanding of diamonds.
                </AnimationSection>
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
                  setSearchText('');
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
                setSearchText(e.target.value);
                setSelectedTab('View All');
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
        {filteredPosts?.length > 0 && <MoreStories posts={filteredPosts} />}
      </div>
    </div>
  );
};

export default BlogList;
