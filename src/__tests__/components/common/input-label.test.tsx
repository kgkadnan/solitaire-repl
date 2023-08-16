import React from "react";
import { logRoles, render } from "@testing-library/react";
import { CustomInputlabel } from "@/components/common/input-label";

describe("CustomInputlabel", () => {
  it("renders label correctly with overridden style", () => {
    // Mock props for the component with overridden style
    const mockProps = {
      htmlfor: "mockInput",
      label: "Test Label",
      overriddenStyles: { label: "text-solitaireQuaternary" },
    };

    // Render the component with the mock props
    const { getByTestId } = render(<CustomInputlabel {...mockProps} />);

    // Get the label element by its test ID
    const labelElement = getByTestId("custom-label");

    // Log the roles of the label element (useful for debugging)
    logRoles(labelElement);

    // Assert that the label element is in the document
    expect(labelElement).toBeInTheDocument();

    // Assert that the overridden style class is applied
    expect(labelElement).toHaveClass("text-solitaireQuaternary");
  });

  it("renders label correctly without overridden style", () => {
    // Mock props for the component without overridden style
    const mockProps = {
      htmlfor: "mockInput",
      label: "Test Label",
    };

    // Render the component with the mock props
    const { getByTestId } = render(<CustomInputlabel {...mockProps} />);

    // Get the label element by its test ID
    const labelElement = getByTestId("custom-label");

    // Assert that the label element is in the document
    expect(labelElement).toBeInTheDocument();
  });
});
