import { Meta, StoryObj } from "@storybook/react";
import { CustomRadioButton } from ".";

const meta = {
  title: "CustomRadioButton",
  component: CustomRadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const classes = {
  radioButtonStyle: "text-orange-600",
  radioLabelStyle: "text-amber-500",
};

export const RadioButtonStory: Story = {
  args: {
    radioData: [
      {
        id: "1",
        value: "1",
        radioButtonLabel: "story 1",
      },
      {
        id: "2",
        value: "2",
        radioButtonLabel: "story 2",
      },
    ],
    onChange: () => {},
    radioButtonAllStyles: classes,
  },
};
