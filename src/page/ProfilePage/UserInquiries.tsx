import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Paper, Typography, } from "@mui/material";
import UserColumns from "./InquiriesColumn";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import LoadingOverlay from "../../components/LoadingOverlay";
import Datagrid from "../../components/DataGrid/NewDataGrid";
import SearchBar from "../../components/Searchbar";
import { 
    selectBookingLoading, 
  selectUserInquiries 
} from "../../redux/slices/Travel/Booking/BoookTravelSlice";
import { fetchUserInquiries } from "../../redux/slices/Travel/Booking/BookTravelApiSlice";

export default function UserInquiries({}) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const userInquiries = useSelector(selectUserInquiries);
  const loading = useSelector(selectBookingLoading);
  
  useEffect(() => {
    dispatch(fetchUserInquiries(userId));
  }, [dispatch]);


  const filterUsers = (users: any[], query: string) => {
    return users.filter(
      (user) =>
        (user.email?.toLowerCase().includes(query.toLowerCase()) ||
         user.phoneNumber?.toLowerCase().includes(query.toLowerCase()) ||
         user.name?.toLowerCase().includes(query.toLowerCase()))
)
  };

  const verifiedRows = filterUsers(userInquiries, searchQuery);
  
    const handleViewDetails = (row: any) => {
      navigate(`/inquiry/${userId}/${row.id}`);
    };
    
    const handleViewPackage = (row: any) => {
      navigate(`/package/${row.packageId}/${row.packageTitle}`);
    };

  const columns = UserColumns({ handleViewDetails,handleViewPackage });

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" ml={2} mb={2}>
        Inquiries Management
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
           
              </Box>

              <LoadingOverlay loading={loading} />
              
                <Datagrid
                  getRowId={(row) => row.id}
                  columns={columns}
                  rows={verifiedRows}
                />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}