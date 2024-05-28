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
  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (_event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (_event: ChangeEvent<HTMLInputElement>) => void;
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
    _newValue: SingleValue<string | number>,
    _actionMeta: ActionMeta<string | number>
  ) => void;
  handleInputChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  onBlur?: (_event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  onFocus?: (_event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
