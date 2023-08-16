import { CustomTable } from "@components/common/table/table";
import { render, screen } from "@testing-library/react";

describe("CustomTable component", () => {
  // Sample table data for testing
  const sampleTableData = {
    tableHeads: ["Name", "Age", "City"],
    bodyData: [
      { Name: "John", Age: 25, City: "New York" },
      { Name: "Jane", Age: 30, City: "Los Angeles" },
    ],
  };

  // Common test setup
  beforeEach(() => {
    render(
      <CustomTable
        tableData={sampleTableData}
        tableStyleClasses={{
          tableHeaderStyle: "custom-header-style",
          tableBodyStyle: "custom-body-style",
        }}
      />
    );
  });

  test("renders CustomTable component correctly", () => {
    // Check if table headers and body data are rendered
    const tableHeaders = sampleTableData.tableHeads.map((header) =>
      screen.getByText(header)
    );
    const tableBodyCells = sampleTableData.bodyData.map((data) =>
      Object.values(data).map((value) => screen.getByText(value.toString()))
    );

    tableHeaders.forEach((header) => {
      expect(header).toBeInTheDocument();
    });

    tableBodyCells.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      });
    });
  });

  test("applies tableHeaderStyle and tableBodyStyle classes", () => {
    // Check if table headers have the custom-header-style class
    const tableHeaders = sampleTableData.tableHeads.map((header) =>
      screen.getByText(header)
    );
    tableHeaders.forEach((header) => {
      expect(header).toHaveClass("custom-header-style");
    });

    // Check if table body cells have the custom-body-style class
    const tableBodyCells = sampleTableData.bodyData.map((data) =>
      Object.values(data).map((value) => screen.getByText(value.toString()))
    );
    tableBodyCells.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        expect(cell).toHaveClass("custom-body-style");
      });
    });
  });
});
