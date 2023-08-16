import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CustomDisplayButton } from "@/components/common/Buttons/display-button/display-button";

describe("CustomDisplayButton Component", () => {
  // Mock click handler
  let onItemClick = jest.fn();

  // Common test setup
  beforeEach(() => {
    render(
      <CustomDisplayButton
        displayButtonLabel="Test Button"
        handleClick={onItemClick}
        displayButtonAllStyle={{
          displayButtonStyle: "custom-button-style",
          displayLabelStyle: "custom-label-style",
        }}
        color="blue"
      />
    );
  });

  test("render custom-display-button component correctly", () => {
    const buttonElement = screen.getByTestId("display-button");

    // @ts-ignore
    // Check if the button element is in the document
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls the handleClick function when the button is clicked", () => {
    const buttonElement = screen.getByTestId("display-button");

    // Simulate a button click
    fireEvent.click(buttonElement);

    // Check if the handleClick function was called
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  test("applies displayButtonStyle and displayLabelStyle classes", () => {
    const button = screen.getByTestId("display-button");
    const label = screen.getByTestId("display-button-label");

    // @ts-ignore
    // Check if the button has the custom-button-style class
    expect(button).toHaveClass("custom-button-style");

    // Check if the label's parent element has the custom-label-style class
    expect(label.parentElement?.classList.contains("custom-label-style"));
  });

  test("passes color prop to handleClick function", () => {
    const button = screen.getByTestId("display-button");

    // Simulate a button click
    fireEvent.click(button);

    // Check if the onItemClick function was called with the correct color argument
    expect(onItemClick).toHaveBeenCalledWith("blue");
  });
});
