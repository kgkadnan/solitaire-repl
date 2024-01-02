import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from './translate';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';

interface HandleIsEditingKycProps {
  isEditingKYCStoreData: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogContent: (content: React.ReactNode) => void;
  dispatch: any;
  handleRoute: (label: string, link: string) => void;
  label?: string;
  link?: string;
  styles: any;
  currentRoute?: any;
}

export const handleIsEditingKyc = ({
  isEditingKYCStoreData,
  setIsDialogOpen,
  setDialogContent,
  dispatch,
  handleRoute,
  label,
  link,
  styles,
  currentRoute
}: HandleIsEditingKycProps) => {
  if (isEditingKYCStoreData && currentRoute === '/my-account/kyc') {
    setIsDialogOpen(true);
    setDialogContent(
      <>
        <div className="text-center align-middle text-solitaireTertiary">
          {ManageLocales('app.topNav.kycModelContent')}
        </div>
        <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.topNav.yes')}
            handleClick={() => {
              dispatch(isEditingKYC(false));
              label && link && handleRoute(label, link);
              setIsDialogOpen(false);
              setDialogContent('');
            }}
            displayButtonAllStyle={{
              displayButtonStyle: styles.showResultButtonTransparent
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.topNav.no')}
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
    label && link && handleRoute(label, link);
  }
};
