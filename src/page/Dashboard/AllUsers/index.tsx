import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper, Typography, Switch, Tabs, Tab } from "@mui/material";
import UserColumns from "./UserColumn";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../redux/slices/Admin/UsersApiSlice";
import { AppDispatch } from "../../../redux/store";
import LoadingOverlay from "../../../components/LoadingOverlay";
import Datagrid from "../../../components/DataGrid/NewDataGrid";
import SearchBar from "../../../components/Searchbar";
import { 
  selectUsersLoading, 
  selectVerifiedUsers, 
  selectUnverifiedUsers 
} from "../../../redux/slices/Admin/UsersSlice";

export default function AllUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  
  const verifiedUsers = useSelector(selectVerifiedUsers);
  const unverifiedUsers = useSelector(selectUnverifiedUsers);
  const loading = useSelector(selectUsersLoading);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filterUsers = (users: any[], query: string) => {
    return users.filter(
      (user) =>
        (user.email?.toLowerCase().includes(query.toLowerCase()) ||
         user.phoneNumber?.toLowerCase().includes(query.toLowerCase()) ||
         user.name?.toLowerCase().includes(query.toLowerCase()))
)
  };

  const verifiedRows = filterUsers(verifiedUsers, searchQuery);
  const unverifiedRows = filterUsers(unverifiedUsers, searchQuery);
  
    const handleViewDetails = (row: any) => {
      navigate(`/admin/users/${row.id}`);
    };

  const columns = UserColumns({ handleViewDetails });

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        User Management
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ mb: 2, overflow: "hidden", borderRadius: 4 }}>
          <Box sx={{ width: "100%", margin: "8px", position: "relative" }}>
            <Paper sx={{ overflow: "hidden", borderRadius: 4, padding: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                //   placeholder="Search users..."
                />
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Verified Users" />
                  <Tab label="Unverified Users" />
                </Tabs>
              </Box>

              <LoadingOverlay loading={loading} />
              
              {tabValue === 0 ? (
                <Datagrid
                  getRowId={(row) => row.id}
                  columns={columns}
                  rows={verifiedRows}
                />
              ) : (
                <Datagrid
                  getRowId={(row) => row.id}
                  columns={columns}
                  rows={unverifiedRows}
                />
              )}
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}