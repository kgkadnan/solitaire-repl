import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CalculatedField from '@/components/v2/common/calculated-field';

export default {
  title: 'Components/CalculatedField',
  component: CalculatedField
} as Meta;

const sampleProducts: any = [
  {
    id: '1',
    variants: [
      {
        prices: [{ amount: 100 }]
      }
    ],
    carats: 1.2,
    discount: 10,
    price_per_carat: 50
  },
  {
    id: '2',
    variants: [
      {
        prices: [{ amount: 200 }]
      }
    ],
    carats: 2.5,
    discount: 15,
    price_per_carat: 60
  },
  {
    id: '3',
    variants: [
      {
        prices: [{ amount: 300 }]
      }
    ],
    carats: 3.1,
    discount: 20,
    price_per_carat: 70
  }
];

const Template: Story = args => {
  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, boolean>
  >({
    '1': true,
    '2': true
  });

  const handleProductSelect = (id: string) => {
    const newSelectedProducts = {
      ...selectedProducts,
      [id]: !selectedProducts[id]
    };
    setSelectedProducts(newSelectedProducts);
    action('Product selected')(newSelectedProducts);
  };

  return (
    <>
      <button onClick={() => handleProductSelect('1')}>Toggle Product 1</button>
      <button onClick={() => handleProductSelect('2')}>Toggle Product 2</button>
      <button onClick={() => handleProductSelect('3')}>Toggle Product 3</button>
      <CalculatedField
        rows={[]}
        {...args}
        selectedProducts={selectedProducts}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  rows: sampleProducts
};

export const NoProductsSelected = Template.bind({});
NoProductsSelected.args = {
  rows: sampleProducts,
  selectedProducts: {}
};

export const AllProductsSelected = Template.bind({});
AllProductsSelected.args = {
  rows: sampleProducts,
  selectedProducts: { '1': true, '2': true, '3': true }
};
