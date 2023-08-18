import { Meta, StoryObj } from "@storybook/react";
import { CustomCheckBox } from ".";
import { useState } from "react";

const meta: Meta<typeof CustomCheckBox> = {
  title: "components/Checkbox",
  component: CustomCheckBox,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCheckBox>;

export default meta;

type Story = StoryObj<typeof CustomCheckBox>;

const CheckboxWithHooks = () => {
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleClick = (e: any) => {
    const { id } = e.target;
    let value = e.target.getAttribute("data-state");
    setIsCheck([...isCheck, id]);
    if (value?.toLowerCase() === "checked") {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return <CustomCheckBox data="1" onClick={handleClick} isChecked={isCheck} />;
};

export const Primary: Story = {
  render: () => <CheckboxWithHooks />,
};

export const Secondary: Story = {
  args: {
    data: "1",
    style: "text-solitaireQuaternary",
  },
};
