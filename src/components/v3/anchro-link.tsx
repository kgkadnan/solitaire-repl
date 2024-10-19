import React, { useState } from 'react';

import { Link } from 'react-scroll';

export interface IAnchorLink {
  anchorNavigations: string[];
}
const AnchorLink: React.FC<IAnchorLink> = ({ anchorNavigations }) => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={`flex items-center w-full`}>
      <div className="flex overflow-x-auto no-scrollbar py-[10px]">
        {anchorNavigations.map(links => (
          <div key={`keys-${links}`}>
            <Link
              activeStyle={{
                borderBottom: '2px solid var(--neutral-900)',
                color: 'var(--neutral-900)'
              }}
              to={links}
              spy={true}
              smooth={true}
              offset={-20}
              duration={100}
              delay={0}
              className={`flex-shrink-0 px-[12px] py-[8px] text-center text-mMedium font-medium capitalize cursor-pointer whitespace-nowrap text-neutral600`}
              onClick={() => handleLinkClick(links)}
            >
              {links}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnchorLink;
