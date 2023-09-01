// pages/index.js

import Tooltip from './index';

export default function TooltipExample() {
  return (
    <div>
      <Tooltip tooltipElement={<p>hello</p>} content={<p>dd</p>} />
    </div>
  );
}
