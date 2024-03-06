import { useLazyGetPublicDataQuery } from '@/features/api/public';
import { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [tiriggerPublicData] = useLazyGetPublicDataQuery({});
  const [data, setData] = useState();
  useEffect(() => {
    tiriggerPublicData({ query: 'privacy-policy' })
      .unwrap()
      .then(res => {
        console.log(res);
        setData(data);
      });
  }, []);
  return <>{data}</>;
};

export default PrivacyPolicy;
