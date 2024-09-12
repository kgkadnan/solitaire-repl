import Date from './date';
import CoverImage from './cover-image';

export default function PostHeader({ title, date }: any) {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="max-w-2xl mx-auto flex w-full justify-center">
        <div className="mb-6 text-lg mt-[100px]">
          Published <Date dateString={date} />
        </div>
      </div>
      <div className="flex flex-col w-full justify-around text-center text-headingXL">
        {title}
      </div>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} coverImage={coverImage} />
      </div> */}
    </div>
  );
}
