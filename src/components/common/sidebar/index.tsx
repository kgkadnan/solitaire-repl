'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';
import KGKlogo from '@public/assets/icons/vector.svg';
import Image from 'next/image';
import CustomImageTile, { IImageTileProps } from '../image-tile';
import SavedSearch from '@public/assets/icons/bookmark-outline.svg?url';
import Appointment from '@public/assets/icons/calendar-clear-outline.svg?url';
import MyCart from '@public/assets/icons/cart-outline.svg?url';
import AdvanceSearch from '@public/assets/icons/search-outline.svg?url';
import RecentConfirmation from '@public/assets/icons/checkmark-circle-outline.svg?url';
import Layout from '@public/assets/icons/layout.svg?url';
import MatchPair from '@public/assets/icons/match-pair.svg?url';
import MyDiamond from '@public/assets/icons/my-diamond.svg?url';
import NewArrival from '@public/assets/icons/new-arrival.svg?url';
import Dashboard from '@public/assets/icons/grid-outline.svg?url';
import styles from './sidebar.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomDisplayButton } from '../buttons/display-button';
import { CustomDialog } from '../dialog';
import { ISavedSearch } from '../top-navigation-bar';

const SideBar = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  const [dialogContent, setDialogContent] = useState<ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subRoute = useSearchParams().get('route');
  const onKGKLogoContainerClick = useCallback(() => {
    let localData = JSON.parse(localStorage.getItem('Search')!);

    let data = localData?.filter(
      (isSaved: any) => isSaved.isSavedSearch === false
    );
    if (data?.length && currentRoute == '/search') {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="text-center align-middle text-solitaireTertiary">
            Do you want to save your &quot;Search <br /> Result &quot; for this
            session?
          </div>
          <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
            <CustomDisplayButton
              displayButtonLabel="No"
              handleClick={() => {
                localStorage.removeItem('Search');
                router.push('/');
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={() => {
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled
              }}
            />
          </div>
        </>
      );
    } else {
      router.push('/');
    }
  }, [router, currentRoute]);

  const imageData: IImageTileProps[] = [
    {
      src: <Dashboard className={styles.stroke} alt="dashboard" />,
      title: ManageLocales('app.sideNav.dashboard'),
      link: '/',
      isActive: currentRoute === '/'
    },
    {
      src: <NewArrival className={styles.fill} alt="new-arrival" />,
      title: ManageLocales('app.sideNav.newArrival'),
      link: '/new-arrival',
      isActive: currentRoute === '/new-arrival'
    },
    {
      src: <AdvanceSearch className={styles.stroke} alt="advance-search" />,
      title: ManageLocales('app.sideNav.advanceSearch'),
      link: '/search?route=form',
      isActive: currentRoute === '/search' && subRoute === 'form'
    },
    {
      src: <MatchPair className={styles.stroke} alt="match-pair" />,
      title: ManageLocales('app.sideNav.matchPair'),
      link: '/match-pair',
      isActive: currentRoute === '/match-pair'
    },
    {
      src: <SavedSearch className={styles.stroke} alt="saved-search" />,
      title: ManageLocales('app.sideNav.savedSearches'),
      link: '/search?route=saved',
      isActive: currentRoute === '/search' && subRoute === 'saved'
    },
    {
      src: <MyCart className={styles.stroke} alt="cart" />,
      title: ManageLocales('app.sideNav.cart'),
      link: '/my-cart/active',
      isActive: currentRoute === '/my-cart/active'
    },
    {
      src: <Layout className={styles.fill} alt="layouts" />,
      title: ManageLocales('app.sideNav.layouts'),
      link: '/layouts',
      isActive: currentRoute === '/layouts'
    },
    {
      src: (
        <RecentConfirmation
          className={styles.stroke}
          alt="recent-confiramtion"
        />
      ),
      title: ManageLocales('app.sideNav.recentConfirmations'),
      link: '/recent-confiramtion',
      isActive: currentRoute === '/recent-confiramtion'
    },
    {
      src: <Appointment className={styles.stroke} alt="appointments" />,
      title: ManageLocales('app.sideNav.appointments'),
      link: '/appointments',
      isActive: currentRoute === '/appointments'
    },
    {
      src: <MyDiamond className={styles.stroke} alt="my-diamonds" />,
      title: ManageLocales('app.sideNav.myDiamonds'),
      link: '/my-diamonds',
      isActive: currentRoute === '/my-diamonds'
    }
  ];

  const SideBarStyles = {
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles
  };
  const [selectedNav, setSelectedNav] = useState<string[]>([]);

  const handleRoute = (nav: string, link?: string) => {
    router.push(`${link!}`);
    setSelectedNav(() => [nav]);
  };

  const handleChange = (nav: string, link?: string) => {
    const localData:ISavedSearch[] = JSON.parse(localStorage.getItem('Search')!);

    const data = localData?.filter(
      (isSaved: ISavedSearch) => isSaved.isSavedSearch === false
    );

    // if (data?.length && link !== '/search?route=form') {
    if (data?.length && currentRoute == '/search') {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="text-center align-middle text-solitaireTertiary">
            Do you want to save your &quot;Search <br /> Result &quot; for this
            session?
          </div>
          <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
            <CustomDisplayButton
              displayButtonLabel="No"
              handleClick={() => {
                localStorage.removeItem('Search');
                handleRoute(nav, link);
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={() => {
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled
              }}
            />
          </div>
        </>
      );
    }
    // else if (data?.length && link === '/search?route=form') {
    //   handleRoute(nav, link);
    // }
    else {
      localStorage.removeItem('Search');
      handleRoute(nav, link);
    }
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div
        className={`flex flex-col w-[93px]  bg-solitaireSecondary ${styles.sidebarMainDiv}`}
      >
        <div
          className={`flex items-center justify-center cursor-pointer gap-[40px] h-[81px] ${styles.kgkIconStyle}`}
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
        <div className={`w-[93px] flex justify-center ${styles.sidebar}`}>
          <div className="overflow-hidden  h-[100vh] flex flex-row p-[3px] whitespace-normal break-words justify-center bg-solitaireSecondary ">
            <CustomImageTile
              imageTileData={imageData}
              overriddenStyles={SideBarStyles}
              selectedTile={selectedNav}
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
