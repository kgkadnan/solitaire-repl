import { Dispatch, SetStateAction } from 'react';
import { IModalSetState } from '../../interface';

const customerDetail = JSON.parse(localStorage.getItem('user')!);

export const handleUnlockPricing = (
  setContactSaleTeamInputValue: Dispatch<SetStateAction<string>>,
  modalSetState: IModalSetState
) => {
  const message = `Hi ${customerDetail?.customer?.kam?.kam_name}, 
I'm interested in your diamond prices and ready to complete KYC. Please get in touch to assist with the process. 
Looking forward to your response!`;
  setContactSaleTeamInputValue(message);
  modalSetState.setIsInputDialogOpen(true);
};

export const handleContactSaleTeam = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setContactSaleTeamInputValue: Dispatch<SetStateAction<string>>
) => {
  const inputValue = event.target.value;

  setContactSaleTeamInputValue(inputValue);
};
