import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomHeader from "@components/common/header";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe("CustomHeader component", () => {
  const headerData = {
    headerHeading: "Test Heading",
    searchCount: 5,
    handleSearch: jest.fn(),
    searchValue: "Test Value",
    handleSuggestionClick: jest.fn(),
    suggestions: ["Suggestion 1", "Suggestion 2"],
  };

  it("renders correctly with provided data", () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomHeader data={headerData} />
    );

    // Check if heading and search count are rendered correctly
    expect(getByText("Test Heading (5)")).toBeInTheDocument();

    // Check if search input and button are rendered
    expect(getByPlaceholderText("Search by name")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("calls handleSearch when input value changes", () => {
    const { getByPlaceholderText } = render(<CustomHeader data={headerData} />);

    const inputElement = getByPlaceholderText("Search by name");

    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(headerData.handleSearch).toHaveBeenCalledWith(
      expect.any(Object) // Match any object (event)
    );
  });

  it("calls handleSuggestionClick when suggestion is clicked", () => {
    const { getByPlaceholderText, getByText } = render(
      <CustomHeader data={headerData} />
    );

    const inputElement = getByPlaceholderText("Search by name");
    fireEvent.focus(inputElement);

    const suggestionElement = getByText("Suggestion 1");
    fireEvent.click(suggestionElement);

    expect(headerData.handleSuggestionClick).toHaveBeenCalledWith(
      "Suggestion 1"
    );
  });
});
