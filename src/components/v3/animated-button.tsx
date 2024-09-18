import React from 'react';

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-[8px] text-white border-[3px] border-solid border-transparent border-image-[linear-gradient(90deg, grey, white, grey) 2]' bg-[linear-gradient(110deg,#2d3d3d,45%,#3a4a4a,55%,#2d3d3d)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
      // className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-[8px] text-white border-[3px] border-solid border-transparent border-image-[linear-gradient(90deg, #c0c0c0, white, #c0c0c0) 2] bg-[linear-gradient(110deg,#2d3d3d,58%,#3a4a4a,62%,#2d3d3d)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}

      {...props}
    >
      {children}
    </button>
  );
};

export default ShimmerButton;
// import React from 'react';

// type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   className?: string;
// };

// const ShimmerButton: React.FC<ShimmerButtonProps> = ({
//   children,
//   className,
//   ...props
// }) => {
//   return (
//     <button
//       className={`relative inline-flex h-16 w-64 items-center justify-center rounded-[32px] text-white
//       bg-[linear-gradient(110deg,#2d3d3d,45%,#3a4a4a,55%,#2d3d3d)] bg-[length:200%_100%]
//       shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_6px_rgba(0,0,0,0.5)]
//       overflow-hidden px-6 font-bold text-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
//       {...props}
//     >
//       {children}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer" />
//     </button>
//   );
// };

// export default ShimmerButton;
