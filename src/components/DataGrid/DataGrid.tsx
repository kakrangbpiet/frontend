import React, { useState, useEffect, useMemo } from 'react';
// import './DataGrid.css';
import {Column} from '../../Datatypes/interface';

export interface DataGridProps<T extends object> {
  /**
   * Array of data objects to display in the grid
   */
  data: T[];
  
  /**
   * Column definitions
   */
  columns: Column<T>[];
  
  /**
   * Unique key function or property name
   */
  keyField: keyof T | ((row: T) => string);
  
  /**
   * Should the grid have row selection
   */
  selectable?: boolean;
  
  /**
   * Handle row selection change
   */
  onSelectionChange?: (selectedRows: T[]) => void;
  
  /**
   * Optional function to handle row click
   */
  onRowClick?: (row: T) => void;
  
  /**
   * Are grid rows hoverable
   */
  hoverable?: boolean;
  
  /**
   * Add zebra striping to rows
   */
  striped?: boolean;
  
  /**
   * Is the grid loading data
   */
  loading?: boolean;
  
  /**
   * CSS class name for the table
   */
  className?: string;
  
  /**
   * CSS styles for the table
   */
  style?: React.CSSProperties;
}

export function DataGrid({
  data,
  columns,
  keyField,
  selectable = false,
  onSelectionChange,
  onRowClick,
  hoverable = true,
  striped = true,
  loading = false,
  className = '',
  style
}) {
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  
  // State for selection
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  // Generate a key for a row
  const getRowKey = (row): string => {
    if (typeof keyField === 'function') {
      return keyField(row);
    }
    return String(row[keyField]);
  };
  
  // Handle header click for sorting
  const handleHeaderClick = (columnId: string, sortable?: boolean) => {
    if (!sortable) return;
    
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig && prevSortConfig.key === columnId) {
        return prevSortConfig.direction === 'asc'
          ? { key: columnId, direction: 'desc' }
          : null;
      }
      return { key: columnId, direction: 'asc' };
    });
  };
  
  // Handle row selection
  const handleRowSelect = (row) => {
    const rowKey = getRowKey(row);
    setSelectedRows((prev) => {
      const updated = { ...prev, [rowKey]: !prev[rowKey] };
      
      // Notify parent of selection change
      if (onSelectionChange) {
        const selectedItems = data.filter((item) => updated[getRowKey(item)]);
        onSelectionChange(selectedItems);
      }
      
      return updated;
    });
  };
  
  // Handle "select all" checkbox
  const handleSelectAll = () => {
    if (Object.keys(selectedRows).length === data.length) {
      // If all are selected, clear selection
      setSelectedRows({});
      if (onSelectionChange) onSelectionChange([]);
    } else {
      // Otherwise, select all
      const newSelectedRows: Record<string, boolean> = {};
      data.forEach((row) => {
        newSelectedRows[getRowKey(row)] = true;
      });
      setSelectedRows(newSelectedRows);
      if (onSelectionChange) onSelectionChange([...data]);
    }
  };
  
  // Reset selections when data changes
  useEffect(() => {
    setSelectedRows({});
  }, [data]);
  
  // Sort the data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = columns.find(col => col.id === sortConfig.key)?.accessor(a);
      const bValue = columns.find(col => col.id === sortConfig.key)?.accessor(b);
      
      if (aValue === bValue) return 0;
      
      const compareResult = (aValue ?? '') < (bValue ?? '') ? -1 : 1;
      return sortConfig.direction === 'asc' ? compareResult : -compareResult;
    });
  }, [data, sortConfig, columns]);
  
  // Get class names for table
  const tableClassName = `data-grid ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''} ${loading ? 'loading' : ''} ${className}`.trim();
  
  return (
    <div className="data-grid-container" style={style}>
      {loading && <div className="data-grid-loading">Loading...</div>}
      
      <table className={tableClassName}>
        <thead>
          <tr>
            {selectable && (
              <th className="selection-cell">
                <input
                  type="checkbox"
                  checked={Object.keys(selectedRows).length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            
            {columns.map((column) => (
              <th
                key={column.id}
                className={`
                  ${column.sortable ? 'sortable' : ''}
                  ${sortConfig?.key === column.id ? `sorted-${sortConfig.direction}` : ''}
                  ${column.align ? `align-${column.align}` : ''}
                `}
                style={{ width: column.width }}
                onClick={() => handleHeaderClick(column.id, column.sortable)}
              >
                {column.header}
                {column.sortable && (
                  <span className="sort-indicator">
                    {sortConfig?.key === column.id && (
                      sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={selectable ? columns.length + 1 : columns.length} className="no-data">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row) => {
              const rowKey = getRowKey(row);
              const isSelected = !!selectedRows[rowKey];
              
              return (
                <tr
                  key={rowKey}
                  className={isSelected ? 'selected' : ''}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <td className="selection-cell" onClick={(e) => {
                      e.stopPropagation();
                      handleRowSelect(row);
                    }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Controlled component
                        aria-label={`Select row ${rowKey}`}
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => {
                    const value = column.accessor(row);
                    return (
                      <td
                        key={`${rowKey}-${column.id}`}
                        className={column.align ? `align-${column.align}` : ''}
                      >
                        {column.cell ? column.cell(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataGrid;
