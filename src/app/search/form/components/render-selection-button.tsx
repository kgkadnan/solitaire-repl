import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import React from 'react';
import styles from '../form.module.scss';
const renderSelectionButtons = (
  data: string[],
  className?: string,
  activeStyle?: string,
  relatedState?: string | string[],
  handleChange?: (change: string) => void,
  highlightIndicator?: boolean
) => {
  return data.map((data: string) => (
    <CustomSelectionButton
      key={data}
      selectionButtonLabel={data}
      handleClick={handleChange}
      data={data}
      selectionButtonAllStyles={{
        selectionButtonStyle: `${styles.selectionButtonStyles} ${
          className ?? ''
        }   ${
          typeof relatedState !== 'string'
            ? relatedState?.includes(data) && activeStyle
            : relatedState === data && activeStyle
        }`,
        selectionButtonLabelStyle: `${styles.labelDefaultStyle} ${
          highlightIndicator &&
          relatedState?.includes(data) &&
          styles.colorDataActiveStyle
        }`
      }}
    />
  ));
};

export default renderSelectionButtons;
