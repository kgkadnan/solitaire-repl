"use client";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import KGKlogo from "@public/assets/icons/Vector.svg";
import Image from "next/image";
import CustomImageTile, { IImageTileProps } from "../image-tile";
import SavedSearch from "@public/assets/icons/bookmark-outline.svg";
import Appointment from "@public/assets/icons/calendar-clear-outline.svg";
import myCart from "@public/assets/icons/cart-outline.svg";
import advanceSearch from "@public/assets/icons/search-outline.svg";
import recentConfirmation from "@public/assets/icons/checkmark-circle-outline.svg";
import layout from "@public/assets/icons/layout.svg";
import matchPair from "@public/assets/icons/match-pair.svg";
import myDiamond from "@public/assets/icons/my-diamond.svg";
import newArrival from "@public/assets/icons/new-arrival.svg";
import dashboard from "@public/assets/icons/grid-outline.svg";
import styles from "./sidebar.module.scss";

const SideBar: NextPage = () => {
  const router = useRouter();

  const onKGKLogoContainerClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const imageData: IImageTileProps[] = [
    {
      src: dashboard,
      title: "Dashboard",
    },
    {
      src: newArrival,
      title: "New Arrival",
    },
    {
      src: advanceSearch,
      title: "Advance Search",
    },
    {
      src: matchPair,
      title: "Match Pair",
    },
    {
      src: SavedSearch,
      title: "Saved Searches",
    },
    {
      src: myCart,
      title: "Cart",
    },
    {
      src: layout,
      title: "layouts",
    },
    {
      src: recentConfirmation,
      title: "Recent Confirmations",
    },
    {
      src: Appointment,
      title: "Appointments",
    },
    {
      src: myDiamond,
      title: "MyDiamonds",
    },
  ];

  const SideBarStyles = {
    imageTileMainContainerStyles: styles.imageTileMainContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    imageTileContainerStyles: styles.imageTileContainerStyles,
  };
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const handleChange = (shape: string) => {
    setSelectedShape(() => [shape]);
  };

  return (
    <>
      <div
        className={`flex flex-col w-[93px] h-[100vh] bg-solitaireSecondary ${styles.sidebarMainDiv}`}
      >
        <div
          className="flex items-center justify-center cursor-pointer gap-[40px] h-[112px] "
          onClick={onKGKLogoContainerClick}
        >
          <Image
            className="w-[42px] h-[55.91px] mx-auto"
            alt="KGKlogo"
            src={KGKlogo}
          />
        </div>
        <hr className={styles.dividerLine} />
        <div className="w-[93px] h-auto flex items-center justify-center">
          <div className="overflow-hidden flex flex-row p-[3px] items-center whitespace-normal break-words justify-center bg-solitaireSecondary ">
            <CustomImageTile
              imageTileData={imageData}
              overriddenStyles={SideBarStyles}
              selectedTile={selectedShape}
              handleSelectTile={handleChange}
              isNavOption={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
