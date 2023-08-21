import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("displays card on basis of search", () => {
    const { getByPlaceholderText, queryByText, getByText } = render(
      <SavedSearch />
    );
    const searchInput = getByPlaceholderText(/Search by name/i);
    // Focus on the input field
    fireEvent.focus(searchInput);

    expect(getByText("R2.01VVS2 Search A")).toBeInTheDocument();
    expect(getByText("R2.01VVS2 Searchb")).toBeInTheDocument();

    fireEvent.click(getByText("R2.01VVS2 Search A"));

    expect(queryByText("R2.01VVS2 Search A")).toBeInTheDocument();
    expect(queryByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  });
});
