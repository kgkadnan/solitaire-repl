'use client';
import CoverImage from './cover-image';
import Link from 'next/link';
import arrow from '@public/v3/icons/arrow-up-right.svg';
import Image from 'next/image';
import Date from './date';
import { useRouter } from 'next/navigation';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  categories
}: any) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        {coverImage && (
          <>
            <CoverImage title={title} coverImage={coverImage} slug={slug} />
            <div className="absolute bottom-0 text-neutral0 p-6 flex w-full justify-between backdrop-blur">
              <div>
                <p className="text-mMedium">{title}</p>
                <Date dateString={date} />
              </div>
              <div>
                {categories?.edges?.length > 0 &&
                  categories.edges.map((category: any, index: number) => (
                    <span key={index} className="ml-1">
                      {category.node.name}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      <h3 className="text-3xl leading-snug">
        <Link
          href={`/v3/blogs/${slug}`}
          className="hover:underline"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
      </h3>

      <div
        className="text-lg leading-relaxed text-neutral600 overflow-hidden text-ellipsis"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => router.push(`/v3/blogs/${slug}`)}
      >
        <p className="text-primaryMain font-semiBold text-lMedium">
          {' '}
          Read post{' '}
        </p>
        <Image src={arrow} alt="up right arrow for read post" />
      </div>

      {/* <Avatar author={author} /> */}
    </div>
  );
}
