export interface IFormState {
  state: any;
  setState: any;
}

export interface IActionButtonDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg: string; // Assuming the type of 'svg' is string, update it accordingly
  label: string;
  isDisable?: boolean;
  handler: () => void;
  isHidden?: boolean;
}
