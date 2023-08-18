import { Meta, StoryObj } from "@storybook/react";
import { CustomSelect } from ".";

const meta: Meta<typeof CustomSelect> = {
  title: "components/Select",
  component: CustomSelect,

  tags: ["autodocs"],
} satisfies Meta<typeof CustomSelect>;

export default meta;

type Story = StoryObj<typeof CustomSelect>;

export const Primary: Story = {
  args: {
    data: [
      { id: 1, value: "Dubai" },
      { id: 2, value: "India" },
      { id: 3, value: "Belgium" },
    ],
    style: {
      selectContent: "w-[20px]",
      selectTrigger: "",
    },
    placeholder: "Select an Option",
  },
};
