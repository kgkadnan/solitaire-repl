import { ChangeEvent, KeyboardEventHandler } from 'react';

export interface IInputStyle {
  input?: string;
  inputMain?: string;
}

export interface IInputFieldProps {
  style?: IInputStyle;
  type: string;
  value?: string | number;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  disable?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
}
