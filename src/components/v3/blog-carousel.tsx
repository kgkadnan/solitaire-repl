'use client';
import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import Date from '@components/v3/date';
import Link from 'next/link';

export const BlogCarousel = ({ posts }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="blog-carousel">
      <Carousel
        infiniteLoop
        centerMode
        centerSlidePercentage={80}
        selectedItem={selectedIndex}
        onChange={handleChange}
        autoPlay
        showIndicators={false} // Disable indicators
        showStatus={false} // Disable status
      >
        {posts.map(({ node }: any, index: number) => (
          <Link
            href={`/v3/blogs/${node.slug.replace(/%20/, '-')}`}
            className="hover:underline"
            key={node.slug.replace(/%20/, '-')}
          >
            <div className="flex ">
              <div className="relative">
                <Image
                  src={node.featuredImage?.node.sourceUrl}
                  alt={'Carousel'}
                  width={500}
                  height={350}
                  className={`rounded-[12px] ${
                    selectedIndex === index
                      ? '!h-[500px]'
                      : '!h-[400px] mt-[50px]'
                  }`}
                />
                {selectedIndex === index && (
                  <div className="absolute bottom-0 text-neutral0 p-6 flex w-full justify-between backdrop-blur rounded-b-[12px] cursor-pointer">
                    <div className="flex flex-col items-start">
                      <p className="text-mMedium">{node.title}</p>
                      <Date dateString={node.date} />
                    </div>
                    <div>
                      {node.categories?.edges?.length > 0 &&
                        node.categories.edges.map(
                          (category: any, index: number) => (
                            <span key={index} className="ml-1">
                              {category.node.name}
                            </span>
                          )
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};
