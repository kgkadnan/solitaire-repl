import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';

import { handleChange } from '../helpers/handle-change';

interface IEventProps {
  selectedEvent: string[];
  setSelectedEvent: Dispatch<SetStateAction<string[]>>;
}

export const Event = ({ selectedEvent, setSelectedEvent }: IEventProps) => {
  const createEvent = (eventNames: string[]) => {
    return eventNames.map(event => ({
      title: event,
      short_name: event.toLocaleUpperCase()
    }));
  };

  const getEventData = JSON.parse(localStorage.getItem('user')!);

  const Event = createEvent(getEventData?.salesperson?.meta_data?.events);

  const handleChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string;
    setSelectedTile: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    if (selectedTile === data) {
      setSelectedTile('');
    } else {
      setSelectedTile(data);
    }
  };

  return (
    <div id="Event">
      <AccordionComponent
        value="Event"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <Tile
              tileData={Event}
              selectedTile={selectedEvent}
              setSelectedTile={setSelectedEvent}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Event'}
        hasError={false}
      />
    </div>
  );
};
