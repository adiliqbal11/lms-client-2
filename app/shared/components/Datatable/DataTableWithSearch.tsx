import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { TableColumns } from './types';
import { SplitButton } from 'primereact/splitbutton';

interface DatatableWithSearchProps<T> {
  tableColumns: TableColumns[];
  data: T[];
  loading?: boolean;
}


const DataTableWithSearch = <T,>({ data, tableColumns, loading }: DatatableWithSearchProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const dataTableReference = useRef<DataTable<any[]>>(null);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };
  const exportCSV = (selectionOnly: any) => {
    dataTableReference?.current?.exportCSV({ selectionOnly });
  };
  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      saveAsExcelFile(excelBuffer, 'products');
    });
  };
  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
  const actions = [
    { label: 'Export CSV', icon: 'pi pi-file-pdf', command: exportCSV },
    { label: 'Export Xlsx', icon: 'pi pi-file-excel', command: exportExcel }
  ];
  const renderHeader = () => {
    return (
      <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
      <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
        <InputText value={globalFilter} onChange={onInputChange} placeholder="Keyword Search" className="mx-2 my-2" />
        <SplitButton
          label="Export"
          icon="pi pi-download"
          model={actions}
          onClick={exportExcel}
        />
      </div>
    </div>
    );
  };
  // const exportColumns = tableColumns.map((x) => ({ title: x?.header, dataKey: x?.field }));
  //   const exportPdf = () => {
  //     import('jspdf').then((jsPDF) => {
  //         import('jspdf-autotable').then(() => {
  //             const doc = new jsPDF.default('l', 'pt', 'a4', true);

  //             doc?.autoTable(exportColumns, data);
  //             doc.save('products.pdf');
  //         });
  //     });
  // };

  const header = renderHeader();
  return (
    <div>
      <div className="card">
        <DataTable
          ref={dataTableReference}
          value={data}
          header={header}
          globalFilter={globalFilter}
          loading={loading}
          emptyMessage="No records found">
          {tableColumns.map((x: TableColumns) => (
            <Column
              key={x.field}
              field={x.field}
              header={x.header}
              sortable={x.sortable}
              // TODO: add filter
              // filter={x.filter}
              // filterPlaceholder={x.filterPlaceholder}
              // filterMatchMode={x.filterMatchMode}
              body={x.body}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableWithSearch;
