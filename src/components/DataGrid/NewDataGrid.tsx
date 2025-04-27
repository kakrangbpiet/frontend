import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../LoadingOverlay/NoRowsOverlay";

const Datagrid = ({ 
  getRowId, 
  columns, 
  rows,
  paginationModel,
  onPaginationModelChange,
  rowCount,
  loading,
  sx  
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
      ...sx  
    }}
    getRowId={getRowId}
    
    paginationMode="server"
    rowCount={rowCount}
    pageSizeOptions={[5, 10, 25, 50]}
    paginationModel={paginationModel}
    onPaginationModelChange={onPaginationModelChange}
    
    loading={loading}
    
    disableRowSelectionOnClick
    disableColumnMenu
  />
);

export default Datagrid;