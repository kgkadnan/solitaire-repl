import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import Image from 'next/image';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';

export const handleDelete = async ({
  deleteSavedSearch,
  selectedCheckboxes,
  setDialogContent,
  setIsDialogOpen,
  setSelectedCheckboxes,
  setSelectAllChecked,
  setIsError
}: any) => {
  await deleteSavedSearch(selectedCheckboxes)
    .unwrap()
    .then(() => {
      setDialogContent(
        <>
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={confirmIcon} alt="confirmIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
            <h1 className="text-headingS text-neutral900">
              {ManageLocales('app.savedSearch.successfully.deleted')}
            </h1>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.okay'),
                  handler: () => {
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </>
      );
      setIsDialogOpen(true);
    })
    .catch((error: any) => {
      setDialogContent(
        <>
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={errorSvg} alt="errorSvg" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
            <h1 className="text-headingS text-neutral900">
              {error?.data?.message}
            </h1>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.editSelection'),
                  handler: () => {
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </>
      );
    });
  setSelectedCheckboxes([]);
  setSelectAllChecked(false);
  setIsError(false);
};
