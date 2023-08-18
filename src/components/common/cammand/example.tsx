"use client";
import React, { ChangeEvent, useState } from "react";
import CustomCommand from ".";

const CustomCommandExample = () => {
  let data = {
    heading: "Suggestions",
    items: ["Calender", "Birthday"],
  };
  const [input, setInput] = useState("");

  let onChange = (e: any) => {
    console.log("e", e.target.value);
    setInput(e.target.value);
  };

  let onValueChange = (search: string) => {
    console.log("search", search);
  };

  let inputData = {
    type: "text",
    value: input,
    name: "search",
    placeholder: "search",
    onChange: onChange,
    onValueChange: onValueChange,
  };

  return <CustomCommand data={data} inputData={inputData} />;
};

export default CustomCommandExample;
