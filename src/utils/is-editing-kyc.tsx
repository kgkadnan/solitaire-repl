import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from './translate';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';

interface IHandleIsEditingKycProps {
  isEditingKYCStoreData: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogContent: (content: React.ReactNode) => void;
  dispatch: any;
  handleRoute: (label: string, link: string) => void;
  label?: string;
  link?: string;
  styles: any;
  currentRoute?: string;
}

export const handleIsEditingKyc = ({
  isEditingKYCStoreData,
  setIsDialogOpen,
  setDialogContent,
  dispatch,
  handleRoute,
  label,
  link
}: IHandleIsEditingKycProps) => {
  if (isEditingKYCStoreData && link !== '/my-account/kyc') {
    setIsDialogOpen(true);
    setDialogContent(
      <>
        <div className="text-center align-middle text-solitaireTertiary text-[20px] font-semibold">
          {ManageLocales('app.topNav.areYouSure')}
        </div>
        <div className="text-center align-middle text-solitaireTertiary text-[16px]">
          Do you want to terminate KYC process and explore website?
          <span className="text-[12px]">(your progress will be saved)</span>
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
              displayButtonStyle:
                'bg-transparent border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.topNav.no')}
            handleClick={() => {
              setIsDialogOpen(false);
              setDialogContent('');
            }}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
          />
        </div>
      </>
    );
  } else {
    label && link && handleRoute(label, link);
  }
};
