import { ManageLocales } from '@/utils/v2/translate';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

export const handleDelete = async ({
  deleteSavedSearch,
  selectedCheckboxes,
  setDialogContent,
  setIsDialogOpen,
  setSelectedCheckboxes,
  setSelectAllChecked,
  setIsError,
  setIsLoading
}: any) => {
  setIsLoading(true);
  await deleteSavedSearch(selectedCheckboxes)
    .unwrap()
    .then(() => {
      setIsLoading(false);
      setDialogContent(
        <CommonPoppup
          status="success"
          content={''}
          customPoppupBodyStyle="!mt-[70px]"
          header={ManageLocales('app.savedSearch.successfully.deleted')}
          actionButtonData={[
            {
              variant: 'primary',
              label: ManageLocales('app.modal.okay'),
              handler: () => {
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
      setIsDialogOpen(true);
    })
    .catch((error: any) => {
      setIsLoading(false);
      setDialogContent(
        <CommonPoppup
          content={''}
          customPoppupBodyStyle="!mt-[70px]"
          header={error?.data?.message}
          actionButtonData={[
            {
              variant: 'primary',
              label: ManageLocales('app.modal.editSelection'),
              handler: () => {
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
    });
  setSelectedCheckboxes([]);
  setSelectAllChecked(false);
  setIsError(false);
};
