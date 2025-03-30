import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container,Box, Paper, Typography, useTheme, Switch,  } from "@mui/material";
import UserColumns from "./PackageColumn";


import { fetchTravelPackagesApi, updateTravelPackageStatus } from "../../redux/slices/Travel/travelApiSlice";
import { AppDispatch } from "../../redux/store";
import { selectedTravelPackages, selectedTravelPackagesLoading } from "../../redux/slices/Travel/TravelSlice";
import LoadingOverlay from "../LoadingOverlay";
import Datagrid from "../DataGrid/NewDataGrid";
import SearchBar from "../Searchbar";
import OptionsMenu from "../OptionMenu";
import { useNavigate } from "react-router-dom";

export default function PackagesVerification() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [toggleCategoryType, setToggleUerType] = useState("active")

const travelPackages = useSelector(selectedTravelPackages);
  const travelPackagesLoading = useSelector(selectedTravelPackagesLoading);
  useEffect(() => {
    if (toggleCategoryType == "active") {
      dispatch(fetchTravelPackagesApi({status:"active"}))
    }
    else{
        dispatch(fetchTravelPackagesApi({}))
    }
  }, [dispatch, toggleCategoryType]);

  // user hospital
  // let _users = users.map(row => {
  //   row.currentHospital = row.currentHospital.hospitalName + ", " + row.currentHospital.location
  //   row.registeredHospital = row.registeredHospital.hospitalName + ", " + row.registeredHospital.location
  //   return row
  // })


  // Apply filtering only if rows have data
  const filteredRows = travelPackages.travelPackages.filter(
    (row) =>
      row.id &&
      row.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );



  const updateUserStatus = (itemId, status) => {
      dispatch(updateTravelPackageStatus({itemId, status}));
  };


  const toggleStatus = () => {
    setToggleUerType((prevType) => (prevType === "active" ? "paused" : "active"));
  }

  const handleViewDetails = (id) => {
    // Set the dependent information and open the modal
    navigate(`/package/${id}`);
  }

  const columns = UserColumns({setOpenMenu, setSelectedRowId, handleViewDetails});

  return (
    <Container maxWidth="xl">
      <Box>
        {" "}
        {/* Apply blur when updating */}
        <Typography variant="h4" fontWeight="bold">
          My packages
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Paper
            sx={{
              mb: 2,
              overflow: "hidden",
              borderRadius: 4,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <Box sx={{ width: "100%", margin: "8px", position: "relative" }}>
              <Paper sx={{ overflow: "hidden", borderRadius: 4, padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <div>
                    Active
                    <Switch onClick={toggleStatus} />
                    All
                  </div>
                </Box>

                <LoadingOverlay loading={travelPackagesLoading} />
                <Datagrid
                  getRowId={(row) => row.id}
                  columns={columns}
                  rows={filteredRows}
                />
             
                <OptionsMenu
                className={""}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  selectedRowId={selectedRowId}
                  updateUserStatus={updateUserStatus}
                />
            
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}