import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@components/ui/command";

import React from "react";

interface IinputData {
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange: (e: any) => void;
  onValueChange: (search: string) => void;
}

interface ICustomCommand {
  data: {
    heading: string;
    items: string[];
  };
  inputData: IinputData;
}

const CustomCommand: React.FC<ICustomCommand> = ({ data, inputData }) => {
  return (
    <Command>
      <CommandInput
        placeholder={inputData.placeholder}
        // value={inputData.value}
        onValueChange={inputData.onValueChange}
        onSelect={inputData.onChange}
      />
      <CommandList onValueChange={inputData.onValueChange}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading={data.heading}>
          {data.items.map((items) => {
            return (
              <>
                <CommandItem>{items}</CommandItem>
              </>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};

export default CustomCommand;
