import { Meta, StoryObj } from "@storybook/react";
import SideBar from ".";

const meta = {
  title: "components/sideBar",
  component: SideBar,
  tags: ["autodocs"],
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
