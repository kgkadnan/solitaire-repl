export interface PageTitles {
  [key: string]: string;
}

export interface MyDiamondsProps {
  data: any;
  handleCardClick: (id: string) => void;
  productPageDetail?: any;
  check?: string;
  setOffset?: (offset: number) => void;
  setLimit?: (limit: number) => void;
  limit?: number;
}
