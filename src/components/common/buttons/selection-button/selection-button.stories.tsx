import { Meta, StoryObj } from "@storybook/react";
import { CustomSelectionButton } from ".";

const meta = {
  title: "CustomSelectionButton",
  component: CustomSelectionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomSelectionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const classes = {
  selectionButtonStyle: "p-1",
  selectionButtonLabelStyle: "bg-green-600",
};

export const SelectionButtonStory: Story = {
  args: {
    selectionButtonAllStyles: classes,
    selectionButtonLabel: "Slection button",
    handleClick: () => {},
  },
};
