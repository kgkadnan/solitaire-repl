import { Meta, StoryObj } from '@storybook/react';
import { CustomTable } from '.';

const meta = {
  title: 'components/CustomTable',
  component: CustomTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableData = {
  tableHeads: ['invoice', 'paymentStatus', 'totalAmount', 'paymentMethod'],
  bodyData: [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
  ],
};

const classes = {
  tableHeaderStyle: 'text-sky-400',
  tableBodyStyle: 'text-blue-400',
};

export const TableStory: Story = {
  args: {
    tableData: tableData,
    tableStyleClasses: classes,
  },
};
