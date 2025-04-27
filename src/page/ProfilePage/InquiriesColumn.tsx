import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../SinglePackage/DateAvailability";

interface InquiriesColumnProps {
  handleViewDetails?: any
  handleViewPackage?: any;
}

const InquiriesColumn = ({ handleViewDetails, handleViewPackage }: InquiriesColumnProps): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { 
      field: "packageTitle", 
      headerName: "Package Info", 
      width: 180, 
      editable: false,
      renderCell: (params) => (
        <div 
          className="text-blue-600 cursor-pointer underline"
          onClick={() => handleViewPackage && handleViewPackage(params.row)}
        >
          {params.value}
        </div>
      )
    },
    { field: "address", headerName: "Origin Point", width: 150, editable: false },
    { field: "tripType", headerName: "Trip Type", width: 120, editable: false },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      editable: false,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      editable: false,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },
    { field: "destination", headerName: "Destination", width: 150, editable: false },
    { field: "name", headerName: "Name", width: 130, editable: false },
    { field: "email", headerName: "Email", width: 180, editable: false },
    { field: "phoneNumber", headerName: "Phone", width: 130, editable: false },
    { 
      field: "passengerCount", 
      headerName: "Passengers", 
      width: 100, 
      editable: false,
      align: 'center'
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 120, 
      editable: false,
      renderCell: (params) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          params.value === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {params.value}
        </span>
      )
    },
    { 
      field: "specialRequests", 
      headerName: "Special Requests", 
      width: 150, 
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      editable: false,
      renderCell: (params) => (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => handleViewDetails && handleViewDetails(params.row)}
        >
          Details
        </button>
      ),
    },
  ];

  return columns;
}

export default InquiriesColumn;