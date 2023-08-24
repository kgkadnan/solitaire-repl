import { CustomRadioButton } from "@components/common/buttons/radio-button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("RadioButton Component", () => {
  // Mock onChange handler
  let onChangeMock = jest.fn();

  // Sample radio data for testing
  const sampleRadioData = [
    { radioButtonLabel: "Option 1", id: "option1", value: "option1Value" },
    { radioButtonLabel: "Option 2", id: "option2", value: "option2Value" },
    // Add more sample data as needed
  ];

  // Common test setup
  beforeEach(() => {
    render(
      <CustomRadioButton
        radioData={sampleRadioData}
        onChange={onChangeMock}
        radioButtonAllStyles={{
          radioButtonStyle: "custom-radio-button-style",
          radioLabelStyle: "custom-radio-label-style",
        }}
      />
    );
  });

  test("renders RadioButton component correctly", () => {
    const radioButton1 = screen.getByLabelText("Option 1");
    const radioButton2 = screen.getByLabelText("Option 2");

    // Check if radio buttons are in the document
    expect(radioButton1).toBeInTheDocument();
    expect(radioButton2).toBeInTheDocument();
  });

  test("calls the onChange function when a radio button is clicked", () => {
    const radioButton1 = screen.getByLabelText("Option 1");

    // Simulate clicking a radio button
    fireEvent.click(radioButton1);

    // Check if the onChange function was called
    expect(onChangeMock).toHaveBeenCalledWith("option1Value");
  });

  test("applies radioButtonStyle and radioLabelStyle classes", () => {
    const radioButton1 = screen.getByLabelText("Option 1");
    const radioLabel1 = screen.getByText("Option 1");

    // Check if radio button has the custom-radio-button-style class
    expect(radioButton1).toHaveClass("custom-radio-button-style");

    // Check if radio label's parent element has the custom-radio-label-style class
    expect(
      radioLabel1.parentElement?.classList.contains("custom-radio-label-style")
    );
  });
});
