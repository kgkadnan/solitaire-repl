"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import KGKlogo from "@public/assets/icons/Vector.svg";
import Image from "next/image";
import CustomImageTile, { IImageTileProps } from "../image-tile";
import SavedSearch from "@public/assets/icons/bookmark-outline.svg?url";
import Appointment from "@public/assets/icons/calendar-clear-outline.svg?url";
import MyCart from "@public/assets/icons/cart-outline.svg?url";
import AdvanceSearch from "@public/assets/icons/search-outline.svg?url";
import RecentConfirmation from "@public/assets/icons/checkmark-circle-outline.svg?url";
import Layout from "@public/assets/icons/layout.svg?url";
import MatchPair from "@public/assets/icons/match-pair.svg?url";
import MyDiamond from "@public/assets/icons/my-diamond.svg?url";
import NewArrival from "@public/assets/icons/new-arrival.svg?url";
import Dashboard from "@public/assets/icons/grid-outline.svg?url";
import styles from "./sidebar.module.scss";

const SideBar = () => {
  const router = useRouter();

  const onKGKLogoContainerClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const imageData: IImageTileProps[] = [
    {
      src: <Dashboard className={styles.stroke} />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      src: <NewArrival className={styles.stroke} />,
      title: "New Arrival",
      link: "/new-arrival",
    },
    {
      src: <AdvanceSearch className={styles.stroke} />,
      title: "Advance Search",
      link: "advance-search",
    },
    {
      src: <MatchPair className={styles.stroke} />,
      title: "Match Pair",
      link: "/match-pair",
    },
    {
      src: <SavedSearch className={styles.stroke} />,
      title: "Saved Searches",
      link: "/saved-search",
    },
    {
      src: <MyCart className={styles.stroke} />,
      title: "Cart",
      link: "/cart",
    },
    {
      src: <Layout className={styles.stroke} />,
      title: "layouts",
      link: "/layouts",
    },
    {
      src: <RecentConfirmation className={styles.stroke} />,
      title: "Recent Confirmations",
      link: "/recent-confiramtion",
    },
    {
      src: <Appointment className={styles.stroke} />,
      title: "Appointments",
      link: "/appointments",
    },
    {
      src: <MyDiamond className={styles.stroke} />,
      title: "MyDiamonds",
      link: "/my-diamonds",
    },
  ];

  const SideBarStyles = {
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles,
  };
  const [selectedShape, setSelectedShape] = useState<string[]>([]);

  const handleChange = (shape: string, link?: string) => {
    router.push(link!);
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
            className="mx-auto"
            alt="KGKlogo"
            src={KGKlogo}
            width="42"
            height="55"
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
