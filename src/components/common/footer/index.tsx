import React from "react";
import { CustomDisplayButton } from "../Buttons/display-button";
import styles from "./footer.module.scss";
import { IfooterButtonData } from "../search-card";

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
