import { ChangeEvent, KeyboardEventHandler } from 'react';

export interface IInputStyles {
  input?: string;
  inputMain?: string;
}

export interface IInputFieldProps {
  type: string;
  name?: string;
  value: string | number;
  label?: string;
  errorText?: string;
  styles?: IInputStyles;
  placeholder?: string;
  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (_event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (_event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  autoComplete?: string;
  showError?: boolean;
}
