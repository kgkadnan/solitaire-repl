import React from "react";
import { CustomDisplayButton } from "../buttons/display-button";
import styles from "./footer.module.scss";

//footer buttonData interfrace
export interface IfooterButtonData {
  id: number;
  displayButtonLabel: string;
  style: string;
}

interface CustomFooterProps {
  footerButtonData?: IfooterButtonData[];
}

export const CustomFooter: React.FC<CustomFooterProps> = ({
  footerButtonData,
}) => {
  return (
    <div className="flex justify-end w-[1255px] py-4 h-[80px] border-t border-solitaireTertiary ">
      {footerButtonData?.map((item) => {
        return (
          <div key={item.id} className="ml-6">
            <CustomDisplayButton
              displayButtonLabel={item.displayButtonLabel}
              displayButtonAllStyle={{
                displayButtonStyle: `${styles.footerButton} ${item.style}`,
                displayLabelStyle: styles.footerButtonLabel,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
