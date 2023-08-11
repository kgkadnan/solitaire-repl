"use client";
import React from "react";
import { CustomCheckBox } from ".";

export const Example = () => {
  const data = { id: "1" };

  const handleClick = (e: any) => {
    console.log("e.target", e.target);
  };
  return (
    <div>
      <CustomCheckBox data={data.id} onClick={handleClick} />
    </div>
  );
};
