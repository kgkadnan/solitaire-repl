'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import KGKlogo from '@public/assets/icons/vector.svg';
import Image from 'next/image';
import CustomImageTile, { IImageTileProps } from '../image-tile';
import SavedSearch from '@public/assets/icons/bookmark-outline.svg?url';
import Appointment from '@public/assets/icons/calendar-clear-outline.svg?url';
import MyCart from '@public/assets/icons/cart-outline.svg?url';
import AdvanceSearch from '@public/assets/icons/search-outline.svg?url';
import Layout from '@public/assets/icons/layout.svg?url';
import MatchPair from '@public/assets/icons/match-pair.svg?url';
import MyDiamond from '@public/assets/icons/my-diamond.svg?url';
import NewArrival from '@public/assets/icons/new-arrival.svg?url';
import Dashboard from '@public/assets/icons/grid-outline.svg?url';
import styles from './sidebar.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomDialog } from '../dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { CustomDisplayButton } from '../buttons/display-button';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { kycIsCompleted } from '@/features/kyc/kyc-iscompleted-slice';

const SideBar = () => {
  const router = useRouter();
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();
  const kycIsCompletedStoreData: boolean = useAppSelector(
    store => store.kycIsCompleted.status
  );

  const { modalState, modalSetState } = useModalStateManagement();

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { dialogContent, isDialogOpen } = modalState;

  const subRoute = useSearchParams().get('active-tab');

  const onKGKLogoContainerClick = useCallback(() => {
    if (kycIsCompletedStoreData) {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="text-center align-middle text-solitaireTertiary">
            Do you want to terminate KYC process and explore website? (your
            progress will be saved)
          </div>
          <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={() => {
                dispatch(kycIsCompleted(false));
                router.push('/');
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="No"
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
  }, [router, kycIsCompletedStoreData]);

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
      link: `/search?active-tab=${ManageLocales('app.search.newSearchRoute')}`,
      isActive:
        currentRoute === '/search' &&
        subRoute === `${ManageLocales('app.search.newSearchRoute')}`
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
      link: `/search?active-tab=${ManageLocales(
        'app.search.savedSearchesRoute'
      )}`,
      isActive:
        currentRoute === '/search' &&
        subRoute === `${ManageLocales('app.search.savedSearchesRoute')}`
    },
    {
      src: <MyCart className={styles.stroke} alt="cart" />,
      title: ManageLocales('app.sideNav.cart'),
      link: `/my-cart?active-tab=active`,
      isActive: currentRoute === '/my-cart'
    },
    {
      src: <Layout className={styles.fill} alt="layouts" />,
      title: ManageLocales('app.sideNav.layouts'),
      link: '/layouts',
      isActive: currentRoute === '/layouts'
    },
    {
      src: <MyDiamond className={styles.stroke} alt="my-diamonds" />,
      title: ManageLocales('app.sideNav.myDiamonds'),
      link: '/my-diamonds',
      isActive: currentRoute === '/my-diamonds'
    },
    {
      src: <Appointment className={styles.stroke} alt="appointments" />,
      title: ManageLocales('app.sideNav.appointments'),
      link: '/appointments',
      isActive: currentRoute === '/appointments'
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
    if (kycIsCompletedStoreData && currentRoute == '/my-account/kyc') {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="text-center align-middle text-solitaireTertiary">
            Do you want to terminate KYC process and explore website? (your
            progress will be saved)
          </div>
          <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
            <CustomDisplayButton
              displayButtonLabel="yes"
              handleClick={() => {
                dispatch(kycIsCompleted(false));
                handleRoute(nav, link);
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="No"
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
