import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { selectUserType } from '../../redux/slices/login/authSlice';
import { fetchSingleTravelPackageApi, updateTravelPackageStatus } from '../../redux/slices/Travel/travelApiSlice';
import { ITravelPackage, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice';
import { TravelPackageStatus, UserCategory } from '../../Datatypes/Enums/UserEnums';
import AiPromptGenerator from '../../components/AiPrompt/AiPrompt';
import Registration from '../../components/Registration';
import { mockTravelPackages } from '../../components/Card/TravelPackageItems.tsx/mockData';
import { MediaBackground } from './bgRenderer';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';

const SingleTravelPackageDetails = () => {
  const { travelPackageTitle, travelPackageId } = useParams<{ travelPackageTitle: string; travelPackageId: string }>();
  
  const [mockPackage, setMockPackage] = useState<ITravelPackage | undefined>(undefined);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const userType = useSelector(selectUserType);
  
  // Fetch from Redux 
  const selectedTravelPackage = useSelector(useSelectedTravelPackage(travelPackageId)) as ITravelPackage | undefined;
  
  useEffect(() => {
    //mock
    const foundPackage = mockTravelPackages.find(pkg => pkg.id === travelPackageId);
    setMockPackage(foundPackage);
    
    // db
    if (travelPackageId) {
      (dispatch as AppDispatch)(fetchSingleTravelPackageApi({
        itemId: travelPackageId
      }));
    }
  }, [travelPackageId]);

  // mock 
  const packageData = mockPackage || selectedTravelPackage;

  // Default values and null checks
  const description = packageData?.description ?? '';
  const image = packageData?.image ?? '';
  const images = packageData?.images ?? [image];
  const title = packageData?.title ?? travelPackageTitle ?? '';
  const location = packageData?.location ?? '';
  const category = packageData?.category ?? '';
  const status = packageData?.status ?? 'inactive';
  const availableSpots = packageData?.availableSpots ?? 0;
  const travelType = packageData?.travelType ?? 'group';
  const price = packageData?.price ?? 0;
  const originalPrice = packageData?.originalPrice;
  const maxTravelers = packageData?.maxTravelers ?? 0;

  const navigateToHome = () => {
    navigate("/");
  };

  const approveTravelPackage = () => {
    (dispatch as AppDispatch)(updateTravelPackageStatus({
      itemId: travelPackageId,
      setIsUpdating,
      status: TravelPackageStatus.Active
    }));
  };

  const pauseTravelPackage = () => {
    (dispatch as AppDispatch)(updateTravelPackageStatus({
      setIsUpdating,
      itemId: travelPackageId,
      status: TravelPackageStatus.InActive
    }));
  };

  if (!packageData && !mockPackage) {
    return (
      <div className="min-h-screen w-full bg-transparent p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-40 bg-gray-200 rounded mb-6 w-full"></div>
        </div>
      </div>
    );
  }

  // Admin view
  if (userType === UserCategory.KAKRAN_SUPER_ADMIN) {
    return (
      <div className="min-h-screen w-full bg-transparent p-6">
        <div className="max-w-6xl mx-auto mt-6 flex flex-wrap justify-between items-center space-x-2 mb-4">
          <button 
            disabled={isUpdating}
            onClick={status === 'inactive' ? approveTravelPackage : pauseTravelPackage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {status === 'inactive' ? 'Activate' : 'Deactivate'}
          </button>
          
          {/* Admin Edit Package Form would go here */}
        </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
          <AddTravelPackageForm formEvent={"EDIT"} itemInfo={{
                  id: travelPackageId,
                  title,
                  description,
                  price,
                  originalPrice,
                  image,
                  images,
                  location,
                  category,
                  status,
                  availableSpots,
                  travelType,
                  maxTravelers
                }} userType={userType} />
          </div>
      </div>
    );
  }

  // todo
  return (
    <div className="min-h-screen w-full bg-transparent">
      <div className="relative h-[500px] w-full">
      <div className="absolute inset-0 overflow-hidden">
      <MediaBackground media={image} />
</div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent text-white">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={navigateToHome}
              className="px-4 py-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md rounded-lg text-black mb-4 hover:bg-opacity-30 transition"
            >
              Back to Home
            </button>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-lg">{location}</p>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <p className="text-lg capitalize">{category}</p>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <p className="text-lg capitalize">{travelType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto -mt-16 px-4">
        {/* Pricing todo */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm uppercase">Price per person</p>
              <div className="flex items-end gap-2">
                {originalPrice && (
                  <span className="text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                )}
                <span className="text-3xl font-bold text-blue-600">₹{price.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === 'active' ? 'bg-green-100 text-green-800' : 
                status === 'sold-out' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {status === 'active' ? 'Available' : 
                 status === 'sold-out' ? 'Sold Out' : 
                 'Coming Soon'}
              </div>
              {availableSpots > 0 && (
                <p className="text-sm mt-1 text-gray-600">
                  {availableSpots} spots left out of {maxTravelers}
                </p>
              )}
            </div>
          </div>
        </div>

        {/*  Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/*  2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Package</h2>
              <div className="prose text-gray-800">
                {description}
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Package Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p>Duration: 5 Days, 4 Nights</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p>Category: {category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p>Travel Type: {travelType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <p>Location: {location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Book Now</h2>
              {status === 'active' && availableSpots > 0 ? (
                <Registration packageId={travelPackageId} packageTitle={title} />
              ) : (
                <p className="text-gray-700">
                  {status === 'sold-out' ? 'This package is currently sold out.' : 'This package is coming soon!'}
                </p>
              )}
            </div>

            {/* AI Prompt Generator */}
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Need Help Planning?</h2>
              <AiPromptGenerator />
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-100 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden h-48">
                <img 
                  src={`data:image/jpeg;base64,${img}`} 
                  alt={`${title} - image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTravelPackageDetails;