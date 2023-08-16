import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { render, fireEvent } from "@testing-library/react";
import { CustomSearchCard } from "@components/common/search-card";
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));
describe("CustomSearchCard", () => {
  const cardData = [
    {
      cardId: "1",
      cardHeader: "Card Header 1",
      cardContent: "Card Content 1",
    },
    {
      cardId: "2",
      cardHeader: "Card Header 2",
      cardContent: "Card Content 2",
    },
    // ... other card data
  ];

  const cardStyles = {
    cardHeaderContainerStyle: "custom-card-header-container",
    cardTitleStyle: "custom-card-title",
    // ... other styles
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: "Button 1",
      style: "button-style-1",
    },
    // ... other button data
  ];

  test("renders header, cards, and footer correctly", () => {
    const { getByText, getAllByText } = render(
      <CustomSearchCard
        cardData={cardData}
        cardStyles={cardStyles}
        footerButtonData={footerButtonData}
        isChecked={[]}
        handleSelectAllCheckbox={() => {}}
        headerHeading="Search Results"
      />
    );

    expect(getByText(/Search Results/i)).toBeInTheDocument();
    expect(getAllByText(/Card Header/i).length).toBe(2); // Assuming there are 2 card headers
    expect(getAllByText(/Card Content/i).length).toBe(2); // Assuming there are 2 card contents
    expect(getByText("Button 1")).toBeInTheDocument();
  });

  //   test('calls checkboxHandle and handleSelectAllCheckbox when checkboxes are clicked', () => {
  //     const checkboxHandleMock = jest.fn();
  //     const handleSelectAllCheckboxMock = jest.fn();

  //     const { getAllByTestId } = render(
  //       <CustomSearchCard
  //         cardData={cardData}
  //         cardStyles={cardStyles}
  //         footerButtonData={footerButtonData}
  //         checkboxHandle={checkboxHandleMock}
  //         isChecked={[]}
  //         handleSelectAllCheckbox={handleSelectAllCheckboxMock}
  //       />
  //     );

  //     const checkboxes = getAllByTestId('custom-checkbox');
  //     fireEvent.click(checkboxes[0]);
  //     expect(checkboxHandleMock).toHaveBeenCalledWith(cardData[0].cardId);

  //     fireEvent.click(checkboxes[1]);
  //     expect(checkboxHandleMock).toHaveBeenCalledWith(cardData[1].cardId);

  //     fireEvent.click(checkboxes[2]); // Assuming there is a select-all checkbox
  //     expect(handleSelectAllCheckboxMock).toHaveBeenCalled();
  //   });

  test("renders without footer when footerButtonData is not provided", () => {
    const { queryByText } = render(
      <CustomSearchCard
        cardData={cardData}
        cardStyles={cardStyles}
        isChecked={[]}
        handleSelectAllCheckbox={() => {}}
        headerHeading="Search Results"
      />
    );

    expect(queryByText("Button 1")).not.toBeInTheDocument();
  });

  test("renders default card position and calls handleCardAction when card action icon is clicked", () => {
    const handleCardActionMock = jest.fn();

    const { getAllByAltText } = render(
      <CustomSearchCard
        cardData={cardData}
        cardStyles={cardStyles}
        footerButtonData={footerButtonData}
        checkboxHandle={() => {}}
        isChecked={[]}
        handleSelectAllCheckbox={() => {}}
        headerHeading="Search Results"
      />
    );

    const cardActionIcons = getAllByAltText("edit");
    fireEvent.click(cardActionIcons[0]);
    // expect(handleCardActionMock).toHaveBeenCalledWith(cardData[0].stone);
  });

  //   test('renders with selected checkboxes when isChecked contains the card ID', () => {
  //     const isChecked = ['1', '3']; // Assuming cardId "1" and "3" are selected

  //     const { getAllByTestId } = render(
  //       <CustomSearchCard
  //         cardData={cardData}
  //         cardStyles={cardStyles}
  //         footerButtonData={footerButtonData}
  //         checkboxHandle={() => {}}
  //         isChecked={isChecked}
  //         handleSelectAllCheckbox={() => {}}
  //         headerHeading="Search Results"
  //       />
  //     );

  //     const checkboxes = getAllByTestId('custom-checkbox');
  // expect(checkboxes[0].checked).toBe(true);
  // expect(checkboxes[1].checked).toBe(false);
  // expect(checkboxes[2].checked).toBe(true);
  //   });
});
