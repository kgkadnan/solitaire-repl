'use client';

import KAMCard from '@/components/v2/common/kam-card';

const page = () => {
  return (
    <div>
      {' '}
      <div>search</div>
      <KAMCard
        name="Mr. Rajeev Sinha"
        role="Key Account Manager"
        phoneNumber="+91 910 876 6432"
        email="rajeev.sinha@kgkmail.com"
      />
    </div>
  );
};

export default page;
