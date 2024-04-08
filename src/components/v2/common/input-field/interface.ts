import { ChangeEvent, KeyboardEventHandler } from 'react';
import { ActionMeta, SingleValue } from 'react-select';

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  autoComplete?: string;
  showError?: boolean;
}

export interface IDynamicInputFieldProps {
  type: string;
  name: string;
  phoneValue: string | number;
  countryCodeValue: any;
  label?: string;
  errorText?: string;
  styles?: IInputStyles;
  placeholder?: string;
  handleSelectChange: (
    newValue: SingleValue<string | number>,
    actionMeta: ActionMeta<string | number>
  ) => void;
  handleInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
