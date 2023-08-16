import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomSearchResultCard from "@/components/common/search-result-card";
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));
describe("CustomSearchResultCard", () => {
  const cardData = {
    cardId: "1",
    stone: "Diamond",
    cardHeader: "Card Header",
    cardDescription: "Card Description",
    cardContent: "Card Content",
  };

  test("renders card with provided data", () => {
    const { getByText } = render(
      <CustomSearchResultCard cardData={cardData} />
    );

    expect(getByText(/Card Header/i)).toBeInTheDocument();
    // expect(getByText(/Card Description/i)).toBeInTheDocument();
    expect(getByText(/Card Content/i)).toBeInTheDocument();
  });

  test("calls handleCardAction when icon is clicked", () => {
    const handleCardActionMock = jest.fn();
    const { getByAltText } = render(
      <CustomSearchResultCard
        cardData={cardData}
        handleCardAction={handleCardActionMock}
      />
    );

    fireEvent.click(getByAltText("edit"));
    expect(handleCardActionMock).toHaveBeenCalledWith("Diamond");
  });
});
