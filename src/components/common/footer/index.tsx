import React from 'react';
import { CustomDisplayButton } from '../buttons/display-button';
import styles from './footer.module.scss';

//footer buttonData interfrace
export interface IfooterButtonData {
  id: number;
  displayButtonLabel: string | React.ReactNode;
  style?: string;
  fn?: () => void;
}

interface ICustomFooterProps {
  footerButtonData?: IfooterButtonData[];
}

export const CustomFooter: React.FC<ICustomFooterProps> = ({
  footerButtonData,
}) => {
  return (
    <div
      className={`flex justify-end py-4 border-t border-solitaireSenary ${styles.footerParentDiv}`}
    >
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
            />
          </div>
        );
      })}
    </div>
  );
};
