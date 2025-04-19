import Button from "@mui/material/Button";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../SinglePackage/DateAvailability";

interface InquiriesColumnProps {
  handleViewDetails?: any
  handleViewPackage?: any;
}

const InquiriesColumn = ({ handleViewDetails,handleViewPackage }: InquiriesColumnProps): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120, editable: false },
    { 
      field: "packageTitle", 
      headerName: "package Info", 
      width: 180, 
      editable: false,
      renderCell: (params) => (
        <span 
          style={{ 
            color: '#1976d2',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onClick={() => handleViewPackage && handleViewPackage(params.row)}
        >
          {params.value}
        </span>
      )
    },
    { field: "address", headerName: "Origin Point", width: 150, editable: false },
    { field: "tripType", headerName: "Trip Type", width: 150, editable: false },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      editable: false,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      editable: false,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },   { field: "destination", headerName: "Destination", width: 150, editable: false },
    { field: "name", headerName: "Name", width: 150, editable: false },
    { field: "email", headerName: "Email", width: 150, editable: false },
    { field: "phoneNumber", headerName: "phoneNumber", width: 150, editable: false },
    { 
      field: "passengerCount", 
      headerName: "Passenger", 
      width: 120, 
      editable: false 
    },
    
    { 
      field: "status", 
      headerName: "Inquiry Status", 
      width: 120, 
      editable: false,
      renderCell: (params) => (
        <span style={{ 
          color: params.value === 'active' ? 'green' : 'orange',
          fontWeight: 'bold'
        }}>
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
      width: 200,
      editable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {handleViewDetails && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleViewDetails(params.row)}
            >
              Details
            </Button>
          )}
        </div>
      ),
    },
  ];

  return columns;
};

export default InquiriesColumn;