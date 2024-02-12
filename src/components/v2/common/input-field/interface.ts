import { ChangeEvent, KeyboardEventHandler } from 'react';

export interface IInputStyles {
  input?: string;
  inputMain?: string;
}

export interface IInputFieldProps {
  type: string;
  name: string;
  value: string | number;
  label?: string;
  errorText?: string;
  styles?: IInputStyles;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
