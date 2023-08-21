import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SavedSearch from "@/app/saved-search/page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe("SavedSearch Component - Render Card Data", () => {
  it("renders card data correctly based on search filter", () => {
    const { getByText, getByRole } = render(<SavedSearch />);

    // Assuming a suggestion is selected and card data is rendered
    // In this example, let's assume "R2.01VVS2 Search A" is selected
    const selectedSuggestion = "R2.01VVS2 Search A";

    // Check if the card header and content are rendered
    const cardHeader = getByText(selectedSuggestion);
    expect(cardHeader).toBeInTheDocument();

    const cardContent = getByText("Round");
    expect(cardContent).toBeInTheDocument();

    // Assuming there's a "Delete" button in the footer
    const deleteButton = getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("displays all search results on initial render", () => {
    const { getByText } = render(<SavedSearch />);
    expect(getByText("R2.01VVS2 Search A")).toBeInTheDocument();
    expect(getByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  });

  it("renders search input and suggestions correctly", () => {
    const { getByPlaceholderText, getByText } = render(<SavedSearch />);

    // Find the search input
    const searchInput = getByPlaceholderText("Search by name");

    // Type into the search input
    fireEvent.change(searchInput, { target: { value: "R2" } });

    // Ensure suggestions are displayed
    expect(getByText("R2.01VVS2 Search A")).toBeInTheDocument();
    expect(getByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  });

  it("toggles 'Select All' checkbox correctly", () => {
    const { getByTestId, getAllByRole } = render(<SavedSearch />);

    // Find the 'Select All' checkbox
    const selectAllCheckbox = getByTestId("Select All Checkbox");

    // Click the 'Select All' checkbox
    fireEvent.click(selectAllCheckbox);

    // Find all checkboxes
    const checkboxes = getAllByRole("checkbox");

    // Check if all checkboxes are checked
    waitFor(() => {
      checkboxes.forEach((checkbox) => {
        expect(checkbox.ariaChecked).toBe(true);
      });
    });
    // Click the 'Select All' checkbox again
    fireEvent.click(selectAllCheckbox);

    // Check if all checkboxes are unchecked
    waitFor(() => {
      checkboxes.forEach((checkbox) => {
        expect(checkbox.ariaChecked).toBe(false);
      });
    });
  });

  it("displays card details when a card is clicked", () => {
    const { getByTestId, queryAllByText } = render(<SavedSearch />);

    // Find a card
    const card = getByTestId("card-1");

    // Click the card to expand its details
    fireEvent.click(card);

    // Check if detailed information is displayed
    const basicDetailsElement = queryAllByText("Basic Details");
    expect(basicDetailsElement).toHaveLength(2);
  });
});
