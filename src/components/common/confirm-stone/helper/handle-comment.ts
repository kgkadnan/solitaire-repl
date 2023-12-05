import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';

/**
 * The function `handleComment` updates the comment value based on the input value, but only if the
 * input value is within a certain character limit.
 * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
 * event that occurred, such as a change in the input value of an HTML input element.
 */
export const handleComment = (event: any, setCommentValue: any) => {
  let inputValue = event.target.value;
  if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
    setCommentValue(inputValue);
  }
};
