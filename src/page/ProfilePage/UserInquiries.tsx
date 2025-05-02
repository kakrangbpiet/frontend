import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Paper } from "@mui/material";
// import UserColumns from "./InquiriesColumn";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import LoadingOverlay from "../../components/LoadingOverlay";
// import Datagrid from "../../components/DataGrid/NewDataGrid";
import SearchBar from "../../components/Searchbar";
import {
  selectBookingLoading,
  selectUserInquiries
} from "../../redux/slices/Travel/Booking/BoookTravelSlice";
import { fetchUserInquiries } from "../../redux/slices/Travel/Booking/BookTravelApiSlice";
import { formatDate } from "../SinglePackage/DateAvailability";
import RazorpayPaymentButton from "../../components/Payment/RazorpayPaymentButton";
import { isAuthenticated } from "../../redux/slices/login/authSlice";

export default function UserInquiries({ }) {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const userInquiries = useSelector(selectUserInquiries);
  const loading = useSelector(selectBookingLoading);

    const isUserAuthenticated = useSelector(isAuthenticated);
    const navigation = useNavigate();
  
    useEffect(() => {
      if (!isUserAuthenticated) {
        navigation("/"); 
      }
    }, [isUserAuthenticated, history]);

  useEffect(() => {
    dispatch(fetchUserInquiries(userId));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filterUsers = (users: any[], query: string, filter: string) => {
    return users.filter(
      (user) => {
        const matchesSearch =
          user.email?.toLowerCase().includes(query.toLowerCase()) ||
          user.phoneNumber?.toLowerCase().includes(query.toLowerCase()) ||
          user.name?.toLowerCase().includes(query.toLowerCase()) ||
          user.packageTitle?.toLowerCase().includes(query.toLowerCase());

        const matchesFilter = filter === "all" || user.status?.toLowerCase() === filter.toLowerCase();

        return matchesSearch && matchesFilter;
      }
    );
  };

  const verifiedRows = filterUsers(userInquiries, searchQuery, activeFilter);

  // const handleViewDetails = (row: any) => {
  //   navigate(`/inquiry/${userId}/${row.id}`);
  // };

  const handleViewPackage = (row: any) => {
    navigate(`/package/${row.packageId}/${row.packageTitle}`);
  };

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // const columns = UserColumns({ handleViewDetails, handleViewPackage });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border border-amber-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
          </svg>
        );
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
      'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500',
      'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-violet-500'
    ];

    if (!name) return colors[0];

    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

    const submitTravelInquiry = async () => {
      try {
  
        if (!isUserAuthenticated) {
        } else {
          alert("User Not Logged In!");
        }
      } catch (error) {
      }
    };

  return (
    <div className="">
      <div className="">
        <div className="mb-8 text-center relative overflow-hidden p-6 rounded-2xl bg-white bg-opacity-50 backdrop-blur-sm border border-white border-opacity-50 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 animate-gradient-x"></div>
          <div className="relative z-10">

            <h2 className="text-3xl font-bold mb-2 text-indigo-900 inline-block relative">
              Inquiries Management
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Manage and respond to all customer inquiries
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-grow max-w-xl">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              <div className="flex overflow-x-auto pb-1 -mb-1 md:mb-0 hide-scrollbar">
                <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-all ${activeFilter === 'active'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={() => setActiveFilter('active')}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                    Active
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-all ${activeFilter === 'pending'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={() => setActiveFilter('pending')}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                    Pending
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-all ${activeFilter === 'completed'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    onClick={() => setActiveFilter('completed')}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                    Completed
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-indigo-700">{verifiedRows.length}</span> {verifiedRows.length === 1 ? 'inquiry' : 'inquiries'} found
                {activeFilter !== 'all' && <span> with status <span className="font-medium">{activeFilter}</span></span>}
              </div>
            </div>
          </div>

          <div className="p-6 relative">
            {loading && <LoadingOverlay loading={loading} />}

            <div className="space-y-6">
              {verifiedRows.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No inquiries found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchQuery
                      ? `No results match your search "${searchQuery}". Try using different keywords or filters.`
                      : `There are no ${activeFilter !== 'all' ? activeFilter : ''} inquiries available at the moment.`}
                  </p>
                  {(searchQuery || activeFilter !== 'all') && (
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium text-sm hover:bg-indigo-200 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("all");
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                verifiedRows.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 ${expandedCard === inquiry.id
                      ? 'shadow-xl border-indigo-200'
                      : 'hover:shadow-lg hover:border-indigo-100'
                      }`}
                  >
                    {/* Card Header */}
                    <div
                      className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 cursor-pointer"
                      onClick={() => toggleExpandCard(inquiry.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getAvatarColor(inquiry.name)}`}>
                            {inquiry.name?.[0] || '?'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              {inquiry.name}
                              {inquiry.priority === 'high' && (
                                <span className="ml-2 bg-red-100 text-red-800 text-xs py-0.5 px-1.5 rounded-full font-medium">Priority</span>
                              )}
                            </h3>
                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                              </svg>
                              {inquiry.email || 'No email provided'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1 ${getStatusColor(inquiry?.status)}`}>
                            <span className="mr-1">{getStatusIcon(inquiry.status)}</span>
                            {inquiry.status}
                          </span>

                          {inquiry.status === "pending" &&
                                  <RazorpayPaymentButton
                                  inquiryId={inquiry.packageId || ''}
                                  amount={inquiry.price ? parseFloat(inquiry.price) * 100 : 0}
                                  onSuccess={(paymentId) => {
                                    // Handle successful payment
                                    console.log('Payment successful:', paymentId);
                                    submitTravelInquiry(); // Submit the inquiry after payment
                                  }}
                                  onError={(error) => {
                                    console.error('Payment failed:', error);
                                    // alert('Payment failed. Please try again.');
                                  }}
                                />
                          }
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
                      <div
                        className="text-indigo-700 font-medium cursor-pointer flex items-center"
                        onClick={() => handleViewPackage(inquiry)}
                      >
                        <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                        <span className="truncate max-w-xs">{inquiry.packageTitle}</span>
                      </div>
                      <div className="text-md text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Tour Starting: <span className="text-sm">
                          {formatDate( inquiry.startDate)}
                          
                          </span>
                      </div>
                    </div>

                    <div className={`transition-all duration-300 overflow-hidden ${expandedCard === inquiry.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                      <div className="p-4">
                        <div className="mb-4">
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Trip Details</h4>
                          <div className="flex flex-wrap -mx-2">
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 h-full">
                                <p className="text-xs text-blue-700 font-medium mb-1">From</p>
                                <div className="flex items-start">
                                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{formatDate(inquiry.startDate)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 h-full">
                                <p className="text-xs text-blue-700 font-medium mb-1">To</p>
                                <div className="flex items-start">
                                  <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{formatDate(inquiry.endDate)}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 h-full">
                                <p className="text-xs text-indigo-700 font-medium mb-1">Origin</p>
                                <div className="flex items-start">
                                  <svg className="w-4 h-4 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.address}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 h-full">
                                <p className="text-xs text-indigo-700 font-medium mb-1">Destination</p>
                                <div className="flex items-start">
                                  <svg className="w-4 h-4 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.destination}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Additional Information</h4>
                          <div className="flex flex-wrap -mx-2">
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 h-full">
                                <p className="text-xs text-purple-700 font-medium mb-1">Phone</p>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-purple-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.phoneNumber || 'Not provided'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 h-full">
                                <p className="text-xs text-purple-700 font-medium mb-1">Passengers</p>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-purple-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.passengerCount || '1'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 h-full">
                                <p className="text-xs text-amber-700 font-medium mb-1">Trip Type</p>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.tripType || 'One-way'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="px-2 w-1/2 mb-3">
                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 h-full">
                                <p className="text-xs text-amber-700 font-medium mb-1">Accommodation</p>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-amber-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                  </svg>
                                  <p className="font-medium text-gray-800">{inquiry.accommodationType || 'Not specified'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {inquiry.specialRequests && (
                          <div className="mb-4">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Special Requests</h4>
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                              <div className="flex">
                                <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p className="text-gray-700">{inquiry.specialRequests}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {inquiry.customerNotes && (
                          <div className="mb-4">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Customer Notes</h4>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="flex">
                                <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                </svg>
                                <p className="text-gray-700">{inquiry.customerNotes}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors duration-200"
                          onClick={() => toggleExpandCard(inquiry.id)}
                        >
                          {expandedCard === inquiry.id ? (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                              </svg>
                              Hide
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                              View Details
                            </>
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}