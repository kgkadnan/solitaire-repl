import React from "react";
import {  render } from "@testing-library/react";
import AdvanceSearch from "../../app/advance-search/page";

describe("Advance Search Page", () => {
  test("renders Advance Search Page", () => {
    const { getByText } = render(<AdvanceSearch />);
    const headerElement = getByText('Search Diamonds');
    expect(headerElement).toBeInTheDocument();
  });
});
