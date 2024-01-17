import { NoDataFound } from '@/components/common/no-data-found';
import ActiveMyCart from '../components/active/active';
import HoldStones from '../components/hold/hold';
import MemoOut from '../components/memo/memo';
import OutOfStock from '../components/sold/sold';
import {
  IErrorSetState,
  IErrorState,
  IModalSetState,
  ITableColumn
} from '@/app/search/result/result-interface';
import {
  ICheckboxSetState,
  ICheckboxState
} from '@/components/common/checkbox/interface';

interface IHandleRenderCartPages {
  headerPath: any;
  tableColumns: ITableColumn[];
  memoRows: any;
  downloadExcelFunction: () => void;
  errorSetState: IErrorSetState;
  errorState: IErrorState;
  checkboxState: ICheckboxState;
  checkboxSetState: ICheckboxSetState;
  modalSetState: IModalSetState;
  refetch: any;
  modalState: any;
  data: any;
  holdRows: any;
  soldOutRows: any;
}

export const handleRenderCartPages: React.FC<IHandleRenderCartPages> = ({
  headerPath,
  tableColumns,
  memoRows,
  downloadExcelFunction,
  errorSetState,
  errorState,
  checkboxState,
  checkboxSetState,
  modalSetState,
  refetch,
  modalState,
  data,
  holdRows,
  soldOutRows
}) => {
  switch (headerPath) {
    case 'memo':
      return (
        <MemoOut
          tableColumns={tableColumns}
          memoRows={memoRows}
          downloadExcelFunction={downloadExcelFunction}
          errorSetState={errorSetState}
          errorState={errorState}
          checkboxState={checkboxState}
          checkboxSetState={checkboxSetState}
          modalSetState={modalSetState}
        />
      );
    case 'active':
      return (
        <ActiveMyCart
          tableColumns={tableColumns}
          refetch={refetch}
          downloadExcelFunction={downloadExcelFunction}
          errorSetState={errorSetState}
          errorState={errorState}
          checkboxState={checkboxState}
          checkboxSetState={checkboxSetState}
          modalSetState={modalSetState}
          modalState={modalState}
          data={data}
        />
      );
    case 'hold':
      return (
        <HoldStones
          tableColumns={tableColumns}
          holdRows={holdRows}
          downloadExcelFunction={downloadExcelFunction}
          errorSetState={errorSetState}
          errorState={errorState}
          checkboxState={checkboxState}
          checkboxSetState={checkboxSetState}
          modalSetState={modalSetState}
        />
      );
    case 'sold':
      return (
        <OutOfStock
          tableColumns={tableColumns}
          soldOutRows={soldOutRows}
          errorSetState={errorSetState}
          checkboxSetState={checkboxSetState}
          checkboxState={checkboxState}
          modalSetState={modalSetState}
        />
      );

    default:
      return <NoDataFound />;
  }
};
