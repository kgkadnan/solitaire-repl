import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

const DataTable = ({ rows, columns }: any) => {
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow.id,

    //filters
    enableRowSelection: true, //enable some features
    enableFilters: true,
    enableColumnActions: false,
    enablePagination: true,
    enableSorting: true,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions']
      }
    }
  });
  // console.log("table")

  return <MaterialReactTable table={table} />;
};

export default DataTable;
