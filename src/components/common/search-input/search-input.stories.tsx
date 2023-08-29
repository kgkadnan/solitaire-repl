import { Meta, StoryObj } from "@storybook/react";
import { ChangeEvent, useState } from "react";
import { CustomSearchInputField } from ".";

const meta: Meta<typeof CustomSearchInputField> = {
  title: "components/InputField",
  component: CustomSearchInputField,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CustomSearchInputField>;

export default meta;

type Story = StoryObj<typeof CustomSearchInputField>;

const InputWithHooks = () => {
  const [value, setValue] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <CustomSearchInputField
      onChange={handleOnChange}
      value={value}
      type="text"
      name="name"
    />
  );
};

export const Primary: Story = {
  render: () => <InputWithHooks />,
};

export const Secondary: Story = {
  args: {
    type: "text",
    placeholder: "Search by name",
    style: {
      input: "text-solitaireQuaternary",
    },
  },
};
