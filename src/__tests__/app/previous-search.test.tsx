import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import PreviousSearch from "@/app/previous-search/page";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe("PreviousSearch Component", () => {
  // Mock the handleEdit function
  const handleClickEvent = jest.fn();

  // Common test setup
  beforeEach(() => {
    render(<PreviousSearch />);
  });

  test("renders PreviousSearch component correctly", () => {
    // Assert the presence of key UI elements
    expect(screen.getByText(/previous search/i)).toBeInTheDocument();
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
  });

//   test("handles checkbox selection", () => {
//     const checkbox = screen.queryAllByTestId("custom-checkbox");
//     // Select the checkbox
//     userEvent.click(checkbox[0]);
//     expect(checkbox[0]).toBeChecked();

//     // Deselect the checkbox
//     userEvent.click(checkbox[0]);
//     expect(checkbox[0]).not.toBeChecked();
//   });
});
