"use client";
import React, { useState } from "react";
import SearchIcon from "@public/assets/icons/search-outline.svg?url";
import CalculatorIcon from "@public/assets/icons/calculator-outline.svg?url";
import NotificationIcon from "@public/assets/icons/notifications-outline.svg?url";
import MyProfileIcon from "@public/assets/icons/my-profile.svg?url";
import { ToggleButton } from "../toggle";
import { CustomDisplayButton } from "../buttons/display-button";
import { useRouter } from "next/navigation";
import styles from "./top-navigation-bar.module.scss";
import { BottomNavigationBar } from "../bottom-navigation-bar";
import SideBar from "../sidebar";

export const TopNavigationBar = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>("");

  const topNavData = [
    {
      label: "For You",
      link: "/",
    },
    {
      label: "Advance Search",
      link: "/advance-search",
    },
    {
      label: "Previous Search",
      link: "/previous-search",
    },
    {
      label: "Wishlist",
      link: "/wishlist",
    },
    {
      label: "My Cart",
      link: "/my-cart",
    },
  ];

  const handleButtonClick = (label: string, link: string) => {
    setActiveButton(label);
    router.push(link);
  };

  return (
    <div className={styles.topNavigationMainDiv}>
      <div className="h-[112px] flex justify-end items-center text-solitaireTertiary">
        <div className="flex items-center gap-14 mr-12">
          {topNavData.map((navData) => (
            <div key={navData.label}>
              <CustomDisplayButton
                displayButtonAllStyle={{
                  displayButtonStyle:
                    activeButton === navData.label
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle,
                  displayLabelStyle: styles.headerButtonLabelStyle,
                }}
                displayButtonLabel={navData.label}
                handleClick={() =>
                  handleButtonClick(navData.label, navData.link)
                }
              />
            </div>
          ))}
          <SearchIcon className={styles.iconColor} />
          <CalculatorIcon className={styles.iconColor} />
          <NotificationIcon className={styles.iconColor} />
          <MyProfileIcon className={styles.iconColor} />
          <ToggleButton />
        </div>
      </div>
      <hr className={styles.dividerLine} />
      <SideBar />
      <BottomNavigationBar />
    </div>
  );
};
