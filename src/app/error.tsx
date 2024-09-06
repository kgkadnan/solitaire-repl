'use client'; // Error components must be Client Components
// import { LogLevel } from "@/next-axiom/logger";
import { useLogger } from 'next-axiom';
import { usePathname } from 'next/navigation';

import CustomErrorComponent from '@/components/v2/common/error';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log('---------------------------->>>>>>>>>', error);

  //   const pathname = usePathname()
  //   const log = useLogger({ source: "error.tsx" });
  //   let status =  error.message == 'Invalid URL' ? 404 : 500;
  //   log.logHttpRequest(
  //     3, //indicating error as per logHttpRequest
  //     error.message,
  //     {
  //       host: window.location.href,
  //       path: pathname,
  //       statusCode: status,
  //     },
  //     {
  //       error: error.name,
  //       cause: error.cause,
  //       stack: error.stack,
  //       digest: error.digest,
  //     },
  //   );
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return <CustomErrorComponent reset={reset} />;
}
