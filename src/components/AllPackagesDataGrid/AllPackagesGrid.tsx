import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Switch } from "@mui/material";
import { fetchTravelPackagesApi, updateTravelPackageStatus } from "../../redux/slices/Travel/travelApiSlice";
import { AppDispatch } from "../../redux/store";
import { selectedTravelPackages, selectedTravelPackagesLoading } from "../../redux/slices/Travel/TravelSlice";
import SearchBar from "../Searchbar";
import OptionsMenu from "../OptionMenu";
import { useSearchParams } from "react-router-dom";
import { selectUserType } from "../../redux/slices/login/authSlice";
import { UserCategory } from "../../Datatypes/Enums/UserEnums";
import TravelPackages from "../Card/TravelPackageItems.tsx";

interface PackagesVerificationProps {
  currentCategory?: string;
  currentLocation?: string;
  currentStatus?: string;
}

export default function PackagesVerification({
  currentCategory,
  currentLocation,
  currentStatus
}: PackagesVerificationProps) {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedRowId, /*setSelectedRowId*/] = useState(null);
  const [toggleCategoryType, setToggleUerType] = useState(currentStatus || "active"); const [paginationModel, /*setPaginationModel*/] = useState({
    page: 0,
    pageSize: 10,
  });

  const userType = useSelector(selectUserType);
  const travelPackages = useSelector(selectedTravelPackages);
  const travelPackagesLoading = useSelector(selectedTravelPackagesLoading);

  useEffect(() => {
    const params = {
      status: toggleCategoryType === "all" ? undefined : toggleCategoryType,
      category: currentCategory,
      location: currentLocation,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      select: "id,title,location,category,status", // Added status to select
    };
    dispatch(fetchTravelPackagesApi(params));

    const paramsWithImage = {
      status: toggleCategoryType === "all" ? undefined : toggleCategoryType,
      category: currentCategory,
      location: currentLocation,
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      select: "id,title,image,status", // Added status to select
    };
    dispatch(fetchTravelPackagesApi(paramsWithImage));
  }, [dispatch, toggleCategoryType, paginationModel, currentCategory, currentLocation]);



  const filteredPackages = travelPackages.travelPackages.filter(
    (pkg) =>
      pkg?.id &&
      pkg?.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!currentCategory || pkg.category === currentCategory) &&
      (!currentLocation || pkg.location === currentLocation) &&
      (toggleCategoryType === "all" || pkg.status === toggleCategoryType)
  );

  const updateUserStatus = (itemId, status) => {
    dispatch(updateTravelPackageStatus({ itemId, status }));
  };

  const toggleStatus = () => {
    const newStatus = toggleCategoryType === "active" ? "all" : "active";
    setToggleUerType(newStatus);
    searchParams.set("status", newStatus);
    setSearchParams(searchParams);
  }


  // const handleViewDetails = (row) => {
  //   navigate(`/package/${row.id}/${row.title}`);
  // }

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", pt: 2, position: "relative" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {userType === UserCategory.KAKRAN_SUPER_ADMIN && (
              <div>
                Show All
                <Switch
                  checked={toggleCategoryType === "active"}
                  onChange={toggleStatus}
                />
                Active Only
              </div>
            )}
          </Box>

          {!travelPackagesLoading && filteredPackages.length === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem" }}>
              No packages found
            </Box>
          )}
          <TravelPackages
            travelPackages={filteredPackages}
            loading={travelPackagesLoading}
          />

          <OptionsMenu
            className={""}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            selectedRowId={selectedRowId}
            updateUserStatus={updateUserStatus}
          />
        </Box>
      </Box>
    </Box>
  );
}