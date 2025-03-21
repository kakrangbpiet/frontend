import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataGrid } from './DataGrid';

// Sample data for testing
interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

const testData: Person[] = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com' },
];

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row: Person) => row.name,
    sortable: true,
  },
  {
    id: 'age',
    header: 'Age',
    accessor: (row: Person) => row.age,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row: Person) => row.email,
  },
];

describe('DataGrid Component', () => {
  test('renders data correctly', () => {
    render(
      <DataGrid
        data={testData}
        columns={columns}
        keyField="id"
      />
    );
    
    // Check if headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    // Check if data rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });
  
  test('shows "No data available" when data is empty', () => {
    render(
      <DataGrid
        data={[]}
        columns={columns}
        keyField="id"
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
  
  test('supports row selection', () => {
    const handleSelectionChange = jest.fn();
    
    render(
      <DataGrid
        data={testData}
        columns={columns}
        keyField="id"
        selectable
        onSelectionChange={handleSelectionChange}
      />
    );
    
    // Find all checkboxes (one for header and one for each row)
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(testData.length + 1);
    
    // Select first row
    fireEvent.click(checkboxes[1]);
    expect(handleSelectionChange).toHaveBeenCalledWith([testData[0]]);
    
    // Select all rows
    fireEvent.click(checkboxes[0]);
    expect(handleSelectionChange).toHaveBeenCalledWith(testData);
  });
  
  test('supports row clicking', () => {
    const handleRowClick = jest.fn();
    
    render(
      <DataGrid
        data={testData}
        columns={columns}
        keyField="id"
        onRowClick={handleRowClick}
      />
    );
    
    // Click on a row
    fireEvent.click(screen.getByText('Jane Smith'));
    expect(handleRowClick).toHaveBeenCalledWith(testData[1]);
  });
  
  test('shows loading state', () => {
    render(
      <DataGrid
        data={testData}
        columns={columns}
        keyField="id"
        loading
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('supports custom cell rendering', () => {
    const columnsWithCustomCell = [
      ...columns,
      {
        id: 'actions',
        header: 'Actions',
        accessor: () => null,
        cell: (_: any, row: Person) => (
          <button data-testid={`edit-${row.id}`}>Edit</button>
        ),
      },
    ];
    
    render(
      <DataGrid
        data={testData}
        columns={columnsWithCustomCell}
        keyField="id"
      />
    );
    
    expect(screen.getByTestId('edit-1')).toBeInTheDocument();
    expect(screen.getByTestId('edit-2')).toBeInTheDocument();
    expect(screen.getByTestId('edit-3')).toBeInTheDocument();
  });
  
  test('sorts data when clicking sortable headers', () => {
    render(
      <DataGrid
        data={testData}
        columns={columns}
        keyField="id"
      />
    );
    
    // Get the age header and click to sort
    const ageHeader = screen.getByText('Age');
    
    // Initial order is John(28), Jane(32), Bob(45)
    const cellsBeforeSort = screen.getAllByRole('cell');
    
    // Click to sort ascending by age
    fireEvent.click(ageHeader);
    
    // After first click, order should be John(28), Jane(32), Bob(45)
    const cellsAfterFirstClick = screen.getAllByRole('cell');
    
    // Click again to sort descending by age
    fireEvent.click(ageHeader);
    
    // After second click, order should be Bob(45), Jane(32), John(28)
    const cellsAfterSecondClick = screen.getAllByRole('cell');
    
    // Verify cell content changes after sorting
    expect(cellsAfterSecondClick[0].textContent).not.toBe(cellsAfterFirstClick[0].textContent);
  });
});
