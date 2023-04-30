import type { TableColumns } from 'naive-ui/es/data-table/src/interface';
import type { PaginationProps } from 'naive-ui';
import { compareDesc, parse } from 'date-fns';

export function dataTableModule() {
  const columns: TableColumns<any> = [
    {
      title: '',
      key: 'key',
      render: (_, index) => {
        return `${index + 1}`;
      },
    },
    {
      title: 'Дата',
      key: 'date',
      defaultSortOrder: 'ascend',
      sorter: (row1, row2) => {
        const date1 = new Date(1000 * parseInt(row1.start));
        const date2 = new Date(1000 * parseInt(row2.start));

        return compareDesc(date1, date2);
      },
    },
    {
      title: 'Режим',
      key: 'program',
    },
    {
      title: 'Время начала',
      key: 'startDate',
    },
    {
      title: 'Время окончания',
      key: 'endDate',
    },
  ];

  const pagination: PaginationProps = { pageSize: 5 };

  return {
    pagination,
    columns,
  };
}
