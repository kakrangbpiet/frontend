import Button from "@mui/material/Button";
import { GridColDef } from "@mui/x-data-grid";

interface UserColumnsProps {
  handleViewDetails?: any
}

const UserColumns = ({ handleViewDetails }: UserColumnsProps): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120, editable: false },
    { field: "name", headerName: "Name", width: 180, editable: false },
    { field: "email", headerName: "Email", width: 250, editable: false },
    { field: "phoneNumber", headerName: "Phone", width: 150, editable: false },
    { 
      field: "category", 
      headerName: "Category", 
      width: 120, 
      editable: false 
    },
    { 
      field: "accountStatus", 
      headerName: "Status", 
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
    // { 
    //   field: "createdAt", 
    //   headerName: "Registered", 
    //   width: 150, 
    //   editable: false,
    //   valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    // },
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

export default UserColumns;