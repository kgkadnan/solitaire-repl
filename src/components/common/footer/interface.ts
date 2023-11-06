export interface IfooterButtonData {
  id: number;
  displayButtonLabel: string | React.ReactNode;
  style?: string;
  fn?: () => void;
  isDisable?: boolean;
}

export interface ICustomFooterProps {
  footerButtonData?: IfooterButtonData[];
  noBorderTop?: string;
}
