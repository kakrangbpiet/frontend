import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Paper } from "@mui/material";
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
import { formatDate } from "../SinglePackage/DateAvailability";

export default function UserInquiries({}) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  
  const userInquiries = useSelector(selectUserInquiries);
  const loading = useSelector(selectBookingLoading);
  
  useEffect(() => {
    dispatch(fetchUserInquiries(userId));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filterUsers = (users: any[], query: string) => {
    return users.filter(
      (user) =>
        (user.email?.toLowerCase().includes(query.toLowerCase()) ||
         user.phoneNumber?.toLowerCase().includes(query.toLowerCase()) ||
         user.name?.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const verifiedRows = filterUsers(userInquiries, searchQuery);
  
  const handleViewDetails = (row: any) => {
    navigate(`/inquiry/${userId}/${row.id}`);
  };
  
  const handleViewPackage = (row: any) => {
    navigate(`/package/${row.packageId}/${row.packageTitle}`);
  };

  const columns = UserColumns({ handleViewDetails, handleViewPackage });

  return (
<div className="p-5 pt-18 ">
<h2 className="text-2xl font-bold mb-4 text-white bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-xl px-6 py-3">
  Inquiries Management
</h2>


      <div className="w-full bg-transparent rounded-lg  overflow-hidden">
      <div className="p-4 relative">
          <div className="mb-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {loading && <LoadingOverlay loading={loading} />}
          
          {isMobileView ? (
            // Card View for Mobile
            <div className="space-y-4">
              {verifiedRows.map((inquiry) => (
                
                <div key={inquiry.id} className="bg-white/70 backdrop-blur rounded-lg shadow-md overflow-hidden">
                    {/* change trasnprency from bg-white/10 */}

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">ID: {inquiry.id}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        inquiry.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                    
                    <div 
                      className="text-blue-600 underline cursor-pointer mb-2"
                      onClick={() => handleViewPackage(inquiry)}
                    >
                      {inquiry.packageTitle}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Name:</p>
                        <p>{inquiry.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone:</p>
                        <p>{inquiry.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">From:</p>
                        <p>{formatDate(inquiry.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">To:</p>
                        <p>{formatDate(inquiry.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Origin:</p>
                        <p>{inquiry.address}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Destination:</p>
                        <p>{inquiry.destination}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Passengers:</p>
                        <p>{inquiry.passengerCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Trip Type:</p>
                        <p>{inquiry.tripType}</p>
                      </div>
                    </div>

                    {inquiry.specialRequests && (
                      <div className="mt-2">
                        <p className="text-gray-500">Special Requests:</p>
                        <p className="text-sm">{inquiry.specialRequests}</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t px-4 py-3 bg-transparent backdrop-blur-50 flex justify-end">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                      onClick={() => handleViewDetails(inquiry)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Paper sx={{ overflow: "hidden", borderRadius: 4, padding: 2 }}>
              <Datagrid
                getRowId={(row) => row.id}
                columns={columns}
                rows={verifiedRows}
                paginationModel={undefined}
                onPaginationModelChange={undefined}
                rowCount={undefined}
                loading={undefined}
              />
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}