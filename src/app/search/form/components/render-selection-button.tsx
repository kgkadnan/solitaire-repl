import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import React from 'react';
import styles from '../form.module.scss';
import { CustomTooltip } from '@/components/common/shadcn-tooltip';

const renderSelectionButtons = (
  data: string[] | { title: string; short_name: string }[],
  className?: string,
  activeStyle?: string,
  relatedState?: string | string[],
  handleChange?: (change: string) => void,
  caratButtonIdentifier?: boolean
) => {
  return data.map((data: string | { title: string; short_name: string }) => (
    <>
      {typeof data === 'string' ? (
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
            selectionButtonLabelStyle: `${styles.labelDefaultStyle}`
          }}
          caratButtonIdentifier={caratButtonIdentifier}
        />
      ) : (
        <CustomTooltip
          tooltipTrigger={
            <CustomSelectionButton
              key={data.short_name}
              selectionButtonLabel={data.short_name}
              handleClick={handleChange}
              data={data.short_name}
              selectionButtonAllStyles={{
                selectionButtonStyle: `${styles.selectionButtonStyles} ${
                  className ?? ''
                }   ${
                  typeof relatedState !== 'string'
                    ? relatedState?.includes(data.short_name) && activeStyle
                    : relatedState === data.short_name && activeStyle
                }`,
                selectionButtonLabelStyle: `${styles.labelDefaultStyle}`
              }}
              caratButtonIdentifier={caratButtonIdentifier}
            />
          }
          tooltipContent={data.title}
          delayDuration={0}
          tooltipStyles={{ tooltipContent: 'bg-solitaireSenary' }}
        />
      )}
    </>
  ));
};

export default renderSelectionButtons;
