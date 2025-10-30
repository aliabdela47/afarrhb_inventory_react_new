
import React, { useState } from 'react';
import { PencilIcon, TrashIcon, EyeIcon, ChevronUpIcon, ChevronDownIcon } from './icons/Icons';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  sortable?: boolean;
}

interface DataTableProps<T extends { id: any }> {
  columns: Column<T>[];
  data: T[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const DataTable = <T extends { id: any }>({ columns, data, onView, onEdit, onDelete }: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null && typeof sortConfig.key === 'string') {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
        return <ChevronDownIcon className="h-4 w-4 ml-1 opacity-20" />;
    }
    if (sortConfig.direction === 'ascending') {
        return <ChevronUpIcon className="h-4 w-4 ml-1" />;
    }
    return <ChevronDownIcon className="h-4 w-4 ml-1" />;
};


  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                   {col.sortable && typeof col.accessor === 'string' ? (
                     <button className="flex items-center" onClick={() => requestSort(col.accessor as keyof T)}>
                       {col.header} {getSortIcon(col.accessor as keyof T)}
                     </button>
                   ) : (
                     col.header
                   )}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : String(item[col.accessor as keyof T] ?? '')}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-4">
                        {onView && <button onClick={() => onView(item)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200"><EyeIcon className="h-5 w-5" /></button>}
                        {onEdit && <button onClick={() => onEdit(item)} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200"><PencilIcon className="h-5 w-5" /></button>}
                        {onDelete && <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"><TrashIcon className="h-5 w-5" /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* TODO: Add pagination controls */}
    </div>
  );
};

export default DataTable;
