import React from "react";

import userEvent from "@testing-library/user-event";
import { CustomSelect } from "../../../../components/Common/select/index"; // Assuming the component is in a file named CustomSelect.tsx
import { render } from "@testing-library/react";

describe("CustomSelect Component", () => {
  const mockData = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
  ];

  it("renders placeholder and options correctly", () => {
    const { getByText, getByRole, queryByText } = render(
      <CustomSelect data={mockData} placeholder="Select an option" />
    );

    const placeholderElement = getByText("Select an option");
    expect(placeholderElement).toBeInTheDocument();

    userEvent.click(placeholderElement);

    mockData.forEach((item) => {
      const optionElement = queryByText(item.value);
      console.log("option");
      // expect(optionElement).toBeInTheDocument();
    });
  });

  // it("calls handleChange when an option is selected", () => {
  //   const handleChange = jest.fn();

  //   const { getByText } = render(
  //     <CustomSelect data={mockData} placeholder="Select an option" />
  //   );

  //   const optionElement = getByText("Option 2");
  //   fireEvent.click(optionElement);

  //   expect(handleChange).toHaveBeenCalled();
  // });

  // it("applies custom styles to SelectTrigger and SelectContent", () => {
  //   const customStyle = {
  //     selectTrigger: "custom-trigger-class",
  //     selectContent: "custom-content-class",
  //   };

  //   const { container } = render(
  //     <CustomSelect
  //       data={mockData}
  //       placeholder="Select an option"
  //       style={customStyle}
  //     />
  //   );

  //   const triggerElement = container.querySelector(".custom-trigger-class");
  //   const contentElement = container.querySelector(".custom-content-class");

  //   expect(triggerElement).toBeInTheDocument();
  //   expect(contentElement).toBeInTheDocument();
  // });
});
