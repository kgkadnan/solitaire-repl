import { Meta, StoryObj } from "@storybook/react";
import { CustomDisplayButton } from ".";

const meta = {
  title: "components/CustomDisplayButton",
  component: CustomDisplayButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomDisplayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const classes = {
  displayButtonStyle: "p-5",
  displayLabelStyle: "text-rose-900",
};

export const DisplayButtonStory: Story = {
  args: {
    displayButtonLabel: "25 Stones",
    displayButtonAllStyle: classes,
    handleClick: () => {},
  },
};
