// import  { useState } from 'react';
// import { Meta, StoryObj } from '@storybook/react';
// import { DataGrid } from './DataGrid';
// import {Person} from '../../Datatypes/interface'
// const meta: Meta<typeof DataGrid> = {
//   title: 'Components/DataGrid',
//   component: DataGrid,
//   tags: ['autodocs'],
// };

// export default meta;
// type Story = StoryObj<typeof DataGrid>;

// const people: Person[] = [
//   { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', status: 'active', lastLogin: new Date(2023, 0, 15) },
//   { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', status: 'active', lastLogin: new Date(2023, 1, 10) },
//   { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', status: 'inactive', lastLogin: new Date(2022, 10, 5) },
//   { id: 4, name: 'Alice Brown', age: 24, email: 'alice@example.com', status: 'pending', lastLogin: new Date(2023, 2, 20) },
//   { id: 5, name: 'Charlie Wilson', age: 38, email: 'charlie@example.com', status: 'active', lastLogin: new Date(2023, 1, 28) },
// ];

// // Base columns
// const baseColumns = [
//   {
//     id: 'name',
//     header: 'Name',
//     accessor: (row: Person) => row.name,
//     sortable: true,
//   },
//   {
//     id: 'age',
//     header: 'Age',
//     accessor: (row: Person) => row.age,
//     sortable: true,
//     align: 'right' as const,
//   },
//   {
//     id: 'email',
//     header: 'Email',
//     accessor: (row: Person) => row.email,
//   },
//   {
//     id: 'status',
//     header: 'Status',
//     accessor: (row: Person) => row.status,
//     cell: (value: string) => {
//       const statusStyles: Record<string, { bg: string; text: string }> = {
//         active: { bg: '#e6f7e6', text: '#2e7d32' },
//         inactive: { bg: '#feeaea', text: '#c62828' },
//         pending: { bg: '#fff8e1', text: '#f57c00' },
//       };
      
//       const style = statusStyles[value] || { bg: '#f5f5f5', text: '#333' };
      
//       return (
//         <span style={{
//           backgroundColor: style.bg,
//           color: style.text,
//           padding: '3px 8px',
//           borderRadius: '12px',
//           fontSize: '12px',
//           fontWeight: 'bold',
//         }}>
//           {value}
//         </span>
//       );
//     },
//   },
//   {
//     id: 'lastLogin',
//     header: 'Last Login',
//     accessor: (row: Person) => row.lastLogin,
//     cell: (value: Date) => value.toLocaleDateString(),
//     sortable: true,
//   },
// ];

// // Basic example
// export const Basic: Story = {
//   args: {
//     data: people,
//     columns: baseColumns,
//     keyField: 'id',
//   },
// };

// // With selection
// export const WithSelection: Story = {
//   args: {
//     ...Basic.args,
//     selectable: true,
//   },
//   render: (args) => {
//     const [selected, setSelected] = useState<Person[]>([]);
    
//     return (
//       <div>
//         <DataGrid {...args} onSelectionChange={setSelected} />
//         <div style={{ marginTop: '20px' }}>
//           <h3>Selected Rows:</h3>
//           {selected.length === 0 ? (
//             <p>No rows selected</p>
//           ) : (
//             <ul>
//               {selected.map((person) => (
//                 <li key={person.id}>{person.name}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     );
//   },
// };

// // With row click handler
// export const WithRowClick: Story = {
//   args: {
//     ...Basic.args,
//     hoverable: true,
//   },
//   render: (args) => {
//     const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    
//     return (
//       <div>
//         <DataGrid {...args} onRowClick={setSelectedPerson} />
//         <div style={{ marginTop: '20px' }}>
//           <h3>Clicked Row:</h3>
//           {selectedPerson ? (
//             <pre>{JSON.stringify(selectedPerson, null, 2)}</pre>
//           ) : (
//             <p>Click on a row to see details</p>
//           )}
//         </div>
//       </div>
//     );
//   },
// };

// // Loading state
// export const Loading: Story = {
//   args: {
//     ...Basic.args,
//     loading: true,
//   },
// };

// // Empty state
// export const Empty: Story = {
//   args: {
//     ...Basic.args,
//     data: [],
//   },
// };

// // With custom styling
// export const CustomStyling: Story = {
//   args: {
//     ...Basic.args,
//     striped: true,
//     hoverable: true,
//     style: {
//       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//       borderRadius: '8px',
//       overflow: 'hidden',
//     },
//   },
// };

// // With actions column
// export const WithActions: Story = {
//   args: {
//     ...Basic.args,
//     columns: [
//       ...baseColumns,
//       {
//         id: 'actions',
//         header: 'Actions',
//         accessor: () => null,
//         cell: (_: any, row: Person) => (
//           <div style={{ display: 'flex', gap: '8px' }}>
//             <button style={{
//               padding: '4px 8px',
//               backgroundColor: '#f0f0f0',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}>
//               Edit
//             </button>
//             <button style={{
//               padding: '4px 8px',
//               backgroundColor: '#fee',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               color: 'red',
//             }}>
//               Delete
//             </button>
//           </div>
//         ),
//         align: 'center' as const,
//       },
//     ],
//   },
// };