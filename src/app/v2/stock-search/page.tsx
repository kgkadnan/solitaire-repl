import { Metadata } from 'next';
import StockSearch from '.';

export const metadata: Metadata = {
  title: 'KGK - Search Result'
};
export default function MainStockSearch() {
  return <StockSearch />;
}
