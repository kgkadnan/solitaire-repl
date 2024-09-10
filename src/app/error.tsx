'use client'; // Error components must be Client Components
// import { LogLevel } from "@/next-axiom/logger";
// import { useLogger } from 'next-axiom';
// import { usePathname } from 'next/navigation';

import CustomErrorComponent from '@/components/v2/common/error';
import log from 'logging/log-util';

// import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log('---------------------------->>>>>>>>>', error);
  log.error("error");


  return <CustomErrorComponent reset={reset} />;
}
