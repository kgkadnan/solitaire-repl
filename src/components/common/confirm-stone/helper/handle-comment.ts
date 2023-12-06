import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';
import { Dispatch, SetStateAction } from 'react';

export const handleComment = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setCommentValue: Dispatch<SetStateAction<string>>
) => {
  let inputValue = event.target.value;
  if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
    setCommentValue(inputValue);
  }
};
