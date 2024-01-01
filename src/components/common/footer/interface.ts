import React from 'react';

export interface IFooterButtonData {
  id: number;
  displayButtonLabel: string | React.ReactNode;
  style?: string;
  fn?: () => void;
  isHidden?: boolean;
}

export interface ICustomFooterProps {
  footerButtonData?: IFooterButtonData[];
  noBorderTop?: string;
}
