import { Meta, StoryObj } from "@storybook/react";
import { CustomInputlabel } from ".";

const meta: Meta<typeof CustomInputlabel> = {
  title: "components/inputLabel",
  component: CustomInputlabel,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInputlabel>;

export default meta;

type Story = StoryObj<typeof CustomInputlabel>;

export const Primary: Story = {
  args: {
    htmlfor: "id",
    label: "Enter Password",
    overriddenStyles: {
      label: "text-solitaireQuaternary",
    },
  },
};
