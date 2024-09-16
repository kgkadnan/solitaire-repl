import Date from './date';

export default function PostHeader({ title, date }: any) {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex flex-col w-full justify-around text-[30px] mt-[100px]">
        {title}
      </div>
      <div className="max-w-2xl mx-auto flex w-full">
        <div className="mb-6 text-lg ">
          Published <Date dateString={date} />
        </div>
      </div>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} coverImage={coverImage} />
      </div> */}
    </div>
  );
}
