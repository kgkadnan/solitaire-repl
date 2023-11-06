import React from 'react';
import { CustomDisplayButton } from '../buttons/display-button';
import styles from './footer.module.scss';
import { ICustomFooterProps } from './interface';

//footer buttonData interfrace

export const CustomFooter: React.FC<ICustomFooterProps> = ({
  footerButtonData,
  noBorderTop,
}) => {
  return (
    <div className={`${styles.footerParentDiv} ${noBorderTop}`}>
      {footerButtonData?.map((item) => {
        return (
          <div key={item.id} className="ml-6">
            <CustomDisplayButton
              displayButtonLabel={item.displayButtonLabel}
              displayButtonAllStyle={{
                displayButtonStyle: `${styles.footerButton} ${item.style}`,
                displayLabelStyle: styles.footerButtonLabel,
              }}
              handleClick={item.fn}
              isDisable={item.isDisable}
            />
          </div>
        );
      })}
    </div>
  );
};
