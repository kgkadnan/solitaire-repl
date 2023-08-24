import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import WishList from "@app/wishlist/page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe("WishList Component - Render Card Data", () => {
  it("renders card data correctly based on search filter", () => {
    const { getByText, getByRole } = render(<WishList />);

    // Check if the card header and content are rendered
    const cardHeader = getByText("R2.01VVS2 Search A");
    expect(cardHeader).toBeInTheDocument();

    // Assuming there's a "Delete" button in the footer
    const deleteButton = getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it("displays all search results on initial render", () => {
    const { getByText } = render(<WishList />);
    expect(getByText("R2.01VVS2 Search A")).toBeInTheDocument();
    expect(getByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  });

  it("toggles 'Select All' checkbox correctly", () => {
    const { getByTestId, getAllByRole } = render(<WishList />);

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
    const { getByTestId, queryAllByText } = render(<WishList />);

    // Find a card
    const card = getByTestId("card-1");

    // Click the card to expand its details
    fireEvent.click(card);

    // Check if detailed information is displayed
    const basicDetailsElement = queryAllByText("Basic Details");
    expect(basicDetailsElement).toHaveLength(2);
  });
});
