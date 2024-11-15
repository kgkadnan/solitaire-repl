import React, { useState } from 'react';

import { Link } from 'react-scroll';

export interface IGemTracAnchorLink {
  anchorNavigations: string[];
}
const GemTracAnchorLink: React.FC<IGemTracAnchorLink> = ({
  anchorNavigations
}) => {
  return (
    <div className={`flex items-center w-full`}>
      <div className="flex overflow-x-auto no-scrollbar py-[10px]">
        {anchorNavigations.map((links, index) => (
          <div key={`keys-${links}`}>
            <Link
              activeStyle={{
                borderBottom: '2px solid var(--neutral-900)',
                color: 'var(--neutral-900)'
              }}
              to={links}
              spy={true}
              smooth={true}
              offset={-80}
              duration={100}
              delay={0}
              className={`${
                index === 0 &&
                'text-neutral900 border-solid border-neutral900 border-b-[2px]'
              } flex-shrink-0 px-[12px] py-[8px] text-center text-mMedium font-medium capitalize cursor-pointer whitespace-nowrap text-neutral600`}
            >
              {links}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GemTracAnchorLink;
