import { useSearchParams } from 'react-router-dom';
import PackagesVerification from '../../components/AllPackagesDataGrid/AllPackagesGrid.tsx';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { useEffect } from 'react';
import { fetchTravelPackagesApi } from '../../redux/slices/Travel/travelApiSlice.tsx';

const AllTravelPackagesPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    // Get all filter parameters from URL
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const status = searchParams.get("status");

    useEffect(() => {
      const params = {
        category,
        location,
        status: status || "active", // Default to active if not specified
        page: 1,
        pageSize: 10,
        select: "title,category"
      };
      const paramsWithImage = {
        category,
        location,
        status: status || "active", // Default to active if not specified
        page: 1,
        pageSize: 10,
        select: "image,price,status"
      };
       dispatch(fetchTravelPackagesApi(params));
       dispatch(fetchTravelPackagesApi(paramsWithImage));
    }, [category, location, status, dispatch]);
    
    // Pass all filter props to PackagesVerification
    return (
        <>
        <div className="flex justify-center">
            <div className="w-[450px] p-4   bg-transparent border border-white/30 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-xl">
                <h1 className="text-3xl sm:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                    {category ? `${category} Packages` : 
                     location ? `Packages in ${location}` : 
                     'Explore With Us'}
                </h1>
            </div>
        </div>
        <PackagesVerification 
          currentCategory={category}
          currentLocation={location}
          currentStatus={status}
        />
        </>
    );
};

export default AllTravelPackagesPage;