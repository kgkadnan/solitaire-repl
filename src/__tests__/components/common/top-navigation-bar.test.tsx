import { TopNavigationBar } from "@components/common/top-navigation-bar";
import { fireEvent, render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));
describe("Top-Navigation-Bar Component", () => {
  beforeEach(() => {
    render(<TopNavigationBar />);
  });

  test("renders TopNavigationBar component correctly", () => {
    // Assert the presence of key UI elements
    const labels = [
      "For You",
      "Advance Search",
      "Previous Search",
      "Wishlist",
      "My Cart",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });
  });

  test("handles button clicks and navigation", () => {
    const buttons = screen.getAllByRole("button", {
      name: /for you|advance search|previous search|wishlist|my cart/i,
    });

    // Simulate button clicks and verify navigation
    buttons.forEach((button) => {
      fireEvent.click(button);
      expect(mockRouter).toMatchObject({
        asPath: /for you|advance search|previous search|wishlist|my cart/i,
      });
    });
  });
});
