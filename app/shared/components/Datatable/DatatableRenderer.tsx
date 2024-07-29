// DataTableRenderer.tsx

import React from 'react';
import DataTableWithSearch from './DataTableWithSearch'; // Adjust the import path based on your file structure
import { TableColumns } from './types';

interface DataTableRendererProps<T> {
  data: T[];
  tableColumns: TableColumns[];
}

const DataTableRenderer = <T,>({ data, tableColumns }: DataTableRendererProps<T>) => {
  return (
    <DataTableWithSearch<T> data={data} tableColumns={tableColumns} />
  );
};

export default DataTableRenderer;
