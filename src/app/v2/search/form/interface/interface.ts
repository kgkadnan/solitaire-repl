export interface IFormState {
  state: any;
  setState: any;
  errorSetState?: any;
  errorState?: any;
}

export interface IActionButtonDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg?: string; // Assuming the type of 'svg' is string, update it accordingly
  label?: string;
  isDisable?: boolean;
  handler: () => void;
  isHidden?: boolean;
  isLoading?: boolean;
}
