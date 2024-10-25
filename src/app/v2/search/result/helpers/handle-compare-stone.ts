import { dashboardIndentifier } from '@/app/v2/dashboard';
import {
  MAX_COMPARE_STONE,
  MIN_COMPARE_STONE
} from '@/constants/business-logic';
import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

// Define an interface for the function parameters
interface ICompareStoneParams {
  isCheck: any;
  setIsError: (_value: boolean) => void;
  setErrorText: (_text: string) => void;
  activeCartRows: any;
  footerCheck?: string;
  setIsCompareStone: any;
  setCompareStoneData: any;
  customerMobileNumber?: string;
  identifier?: string;
}

export const handleCompareStone = ({
  isCheck,
  setIsError,
  setErrorText,
  activeCartRows,
  setIsCompareStone,
  setCompareStoneData,
  identifier,
  customerMobileNumber
}: ICompareStoneParams) => {
  const maxStones = MAX_COMPARE_STONE;
  const minStones = MIN_COMPARE_STONE;
  let newCheck = Object.keys(isCheck);

  if (newCheck.length > maxStones) {
    setIsError(true);
    setErrorText(`You can compare a maximum of ${maxStones} stones`);
  } else if (newCheck.length < minStones) {
    setIsError(true);
    setErrorText(`Minimum ${minStones} stones are required to compare`);
  } else {
    const compareStones = newCheck?.map((id: string) => {
      return activeCartRows.find((row: any) => row.id === id);
    });

    if (identifier === dashboardIndentifier) {
      trackEvent({
        action: Tracking_Search_By_Text.click_compare_stone_result_page,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
    }

    setIsCompareStone(true);
    setCompareStoneData(
      compareStones.filter(value => value !== null && value !== undefined)
    );

    setIsError(false);
    setErrorText('');
  }
};
