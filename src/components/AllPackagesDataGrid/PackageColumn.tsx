import Button from "@mui/material/Button";
import { MoreVert as MoreIcon } from "@mui/icons-material";
import { ITravelPackage } from "../../redux/slices/Travel/TravelSlice";
import { UserCategory } from "../../Datatypes/Enums/UserEnums";

interface TravelPackageColumnsProps {
  setOpenMenu: (element: HTMLElement) => void;
  setSelectedRowId: (id: string) => void;
  handleViewDetails?: (packageData: ITravelPackage) => void;
  userType?:UserCategory
}

const TravelPackageColumns = ({
  setOpenMenu,
  setSelectedRowId,
  handleViewDetails,
  userType
}: TravelPackageColumnsProps) => {
  const columns = [
    { field: "id", headerName: "ID", width: 120, editable: false },
    { field: "title", headerName: "Title", width: 180, editable: false },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: false,
    },
    { field: "price", headerName: "Price", width: 120, editable: false },
    {
      field: "originalPrice",
      headerName: "Original Price",
      width: 140,
      editable: false,
    },
    { field: "location", headerName: "Location", width: 150, editable: false },
    { field: "category", headerName: "Category", width: 120, editable: false },
    { field: "status", headerName: "Status", width: 140, editable: false },
    {
      field: "maxTravelers",
      headerName: "Max Travelers",
      width: 140,
      editable: false,
    },
    {
      field: "availableSpots",
      headerName: "Available Spots",
      width: 140,
      editable: false,
    },
    {
      field: "travelType",
      headerName: "Travel Type",
      width: 140,
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
              View
            </Button>
          )}
          {userType === UserCategory.KAKRAN_SUPER_ADMIN && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={(event) => {
                setOpenMenu(event.currentTarget);
                setSelectedRowId(params.row.id);
              }}
            >
              <MoreIcon />
            </Button>
          )}
        </div>
      ),
    }
  ];

  return columns;
};

export default TravelPackageColumns;