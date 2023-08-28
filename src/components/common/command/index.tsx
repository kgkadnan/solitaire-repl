import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@components/ui/command';

import React, { useState } from 'react';

type Status = {
  value: string;
  label: string;
};
interface ICustomCommand {
  items: Status[];
}

const CustomCommand: React.FC<ICustomCommand> = ({ items }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleChange = (e: any) => {
    setSelectedStatus(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <Command>
      <CommandInput
        placeholder={'Search by name...'}
        onFocus={() => {
          setShowSuggestions(true);
          setSelectedStatus(null);
        }}
        onBlur={handleInputBlur}
        onSelect={handleChange}
        value={selectedStatus?.value || undefined}
      />
      {showSuggestions && (
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {items.map((status: any) => (
              <CommandItem
                key={status.value}
                onSelect={(value) => {
                  setSelectedStatus(
                    items.find((priority) => priority.value === value) || null
                  );
                  setShowSuggestions(false);
                }}
              >
                <span>{status.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      )}
    </Command>
  );
};

export default CustomCommand;
