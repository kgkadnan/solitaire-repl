import React from 'react';
import Cross from '@public/v2/assets/icons/cross.svg?url';
import Edit from '@public/v2/assets/icons/edit.svg?url';
import Tooltip from '../tooltip';
import { BREADCRUM_CHARACTER_LIMIT } from '@/constants/business-logic';

const Pill = (props: {
  isActive: boolean;
  label: string;
  handlePillClick: () => void;
  handlePillEdit: () => void;
  handlePillDelete: () => void;
}) => {
  const { isActive, label, handlePillClick, handlePillEdit, handlePillDelete } =
    props;
  return (
    <>
      {label?.length > BREADCRUM_CHARACTER_LIMIT ? (
        <Tooltip
          tooltipTrigger={
            <div
              className={`flex border-[1px]  rounded-[20px] gap-[4px] px-[8px] py-[6px]  font-medium text-sMedium cursor-pointer ${
                isActive
                  ? 'border-infoBorder text-infoMain bg-infoSurface'
                  : 'border-neutral200 text-neutral500 bg-neutral-0'
              }`}
            >
              {isActive && (
                <div onClick={handlePillEdit}>
                  <Edit
                    style={{
                      stroke: 'var(--info-main)'
                    }}
                  />
                </div>
              )}
              <p
                className={` ${
                  label.length > BREADCRUM_CHARACTER_LIMIT && ' truncate'
                }`}
                onClick={handlePillClick}
              >
                {label}
              </p>
              <div onClick={handlePillDelete} className="flex items-center">
                <Cross
                  style={{
                    stroke: isActive ? 'var(--info-main)' : 'var(--neutral-500)'
                  }}
                />
              </div>
            </div>
          }
          tooltipContent={label}
          key={`image-tile-data-${label}`}
        />
      ) : (
        <div
          className={`flex border-[1px]  rounded-[20px] gap-[4px] px-[8px] py-[6px]  font-medium text-sMedium cursor-pointer ${
            isActive
              ? 'border-infoBorder text-infoMain bg-infoSurface'
              : 'border-neutral200 text-neutral500 bg-neutral-0'
          }`}
        >
          {isActive && (
            <div onClick={handlePillEdit}>
              <Edit
                style={{
                  stroke: 'var(--info-main)'
                }}
              />
            </div>
          )}
          <p
            className={` ${
              label?.length > BREADCRUM_CHARACTER_LIMIT && ' truncate'
            }`}
            onClick={handlePillClick}
          >
            {label}
          </p>
          <div onClick={handlePillDelete}>
            <Cross
              style={{
                stroke: isActive ? 'var(--info-main)' : 'var(--neutral-500)'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pill;
