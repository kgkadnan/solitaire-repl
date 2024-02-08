import { Checkbox } from '@components/v2/ui/checkbox';
import React from 'react';

interface ICheckboxComponentProps {
  onClick: (evt: any) => void;
  isChecked: boolean;
}

const CheckboxComponent = ({ onClick, isChecked }: ICheckboxComponentProps) => {
  return (
    <Checkbox
      className="rounded-[4px] border-neutral200 bg-neutral0 h-[20px] w-[20px] data-[state=checked]:border-primaryMain data-[state=checked]:bg-primaryMain data-[state=checked]:text-neutral25"
      onClick={onClick}
      checked={isChecked}
    />
  );
};

export default CheckboxComponent;
