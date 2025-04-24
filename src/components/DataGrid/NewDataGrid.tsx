import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../LoadingOverlay/NoRowsOverlay";
const Datagrid = ({ 
  getRowId, 
  columns, 
  rows,
  paginationModel,
  onPaginationModelChange,
  rowCount,
  loading
}) => (
  <DataGrid
    autoHeight
    columns={columns}
    rows={rows}
    slots={{ 
      noRowsOverlay: CustomNoRowsOverlay,
    }}
    sx={{
      "--DataGrid-overlayHeight": "300px",
      mr: "20px",
    }}
    getRowId={getRowId}
    
    // Pagination properties
    paginationMode="server"
    rowCount={rowCount}
    pageSizeOptions={[5, 10, 25, 50]}
    paginationModel={paginationModel}
    onPaginationModelChange={onPaginationModelChange}
    
    // Loading state
    loading={loading}
    
    // Other useful props
    disableRowSelectionOnClick
    disableColumnMenu
  />
);

export default Datagrid;