import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../LoadingOverlay/NoRowsOverlay";
const Datagrid = ({ getRowId, columns, rows }) => (
  <DataGrid
    autoHeight
    columns={columns}
    rows={rows}
    slots={{ noRowsOverlay: CustomNoRowsOverlay }}
    sx={{
      "--DataGrid-overlayHeight": "300px",
      mr: "20px",
    }}
    getRowId={getRowId}
    // hideFooter={true}
  />
);

export default Datagrid;