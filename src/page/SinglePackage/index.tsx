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
import { DateAvailabilityDisplay, formatDate } from './DateAvailability';

const SingleTravelPackageDetails = () => {
  const { travelPackageTitle, travelPackageId } = useParams<{ travelPackageTitle: string; travelPackageId: string }>();

  const [mockPackage, setMockPackage] = useState<ITravelPackage | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileForm, setShowMobileForm] = useState(false);

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
  const dateAvailabilities = packageData?.dateAvailabilities ?? [];
  const image = packageData?.image ?? '';
  const images = packageData?.images ?? [image];
  const title = packageData?.title ?? travelPackageTitle ?? '';
  const location = packageData?.title ?? '';
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

  const toggleMobileForm = () => {
    setShowMobileForm(!showMobileForm);
  };

  if (!packageData && !mockPackage) {
    return (
      <div className="min-h-screen w-full bg-transparent p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-96 bg-gray-700 rounded mb-6"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-40 bg-gray-700 rounded mb-6 w-full"></div>
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
              maxTravelers,
              dateAvailabilities
            }} userType={userType} />
          </div>

          <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
            <p className="text-white">Edit Package Form Placeholder</p>
          </div>
        </div>
      </div>
    );
  }

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
              className="px-4 py-2 bg-transparent backdrop-filter backdrop-blur-md rounded-lg text-white mb-4 hover:bg-opacity-20 hover:bg-white transition"
            >
              Back to Home
            </button>
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-lg">{location}</p>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-lg capitalize">{category}</p>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-lg capitalize">{travelType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main  layout */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/*  tabs and content */}
        <div className="w-full md:w-1/2">
          {/* Navigate tabs */}
          <div className="bg-transparent border-b border-gray-700 mb-4">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-8 py-4 text-lg font-medium ${activeTab === 'overview' ? 'text-white bg-blue-600 bg-opacity-30 rounded-t-lg' : 'text-gray-300 hover:text-white'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-8 py-4 text-lg font-medium ${activeTab === 'photos' ? 'text-white bg-blue-600 bg-opacity-30 rounded-t-lg' : 'text-gray-300 hover:text-white'}`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`px-8 py-4 text-lg font-medium ${activeTab === 'highlights' ? 'text-white bg-blue-600 bg-opacity-30 rounded-t-lg' : 'text-gray-300 hover:text-white'}`}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('dates')}
                className={`px-8 py-4 text-lg font-medium ${activeTab === 'dates' ? 'text-white bg-blue-600 bg-opacity-30 rounded-t-lg' : 'text-gray-300 hover:text-white'}`}
              >
                Dates
              </button>

            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-green-400">About {title.split(' ')[0]}</h2>
              <div className="text-white space-y-4">
                <p>{description || `Experience the beauty and adventure of ${location} with this exclusive travel package. Perfect for those seeking an unforgettable journey.`}</p>
                <p>Set in stunning surroundings, this destination offers a perfect blend of relaxation and adventure, making it ideal for travelers of all kinds.</p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-6 text-green-400">Activities to Enjoy</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-transparent border border-gray-600 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
                  <span className="text-white">River rafting</span>
                </div>
                <div className="bg-transparent border border-gray-600 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
                  <span className="text-white">Paragliding</span>
                </div>
                <div className="bg-transparent border border-gray-600 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
                  <span className="text-white">Skiing</span>
                </div>
                <div className="bg-transparent border border-gray-600 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
                  <span className="text-white">Trekking</span>
                </div>
                <div className="bg-transparent border border-gray-600 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
                  <span className="text-white">Mountain biking</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-green-400">Photo Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden h-64">
                    <img
                      src={`data:image/jpeg;base64,${img}`}
                      alt={`${title} - image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8 border border-gray-800">
              <h2 className="text-3xl font-bold mb-6 text-green-400">Package Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">Duration: 5 Days, 4 Nights</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">Category: {category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">Travel Type: {travelType}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">Location: {location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">All-inclusive package</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-white">Professional tour guides</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-6 text-green-400">Included Services</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Accommodation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Daily breakfast and dinner
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Transportation
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Guided tours
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'dates' && (
            <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} />
          )}

          {/* AI Prompt Generator - Only visible on mobile */}
          <div className="md:hidden mt-8 bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white">Need Help Planning?</h2>
            <AiPromptGenerator />
          </div>
        </div>

        {/*  Form */}
        <div className="w-full md:w-1/2">
          <div className="sticky top-6">
            {/* Package Details and Pricing */}
            <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3 text-white">Package Details</h3>

              <div className="flex items-end gap-3 mb-2">
                {originalPrice && (
                  <span className="text-gray-300 line-through">₹{originalPrice.toLocaleString()}</span>
                )}
                <span className="text-3xl font-bold text-blue-400">₹{price.toLocaleString()}</span>
                <span className="text-gray-300 text-sm">per person</span>
              </div>

              {dateAvailabilities.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm text-gray-300">Next available:</p>
                  <p className="text-white font-medium">
                    {formatDate(dateAvailabilities[0].startDate)} - {formatDate(dateAvailabilities[0].endDate)}
                  </p>
                </div>
              )}

              <div className="flex items-center mt-2 mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'active' ? 'bg-green-900 text-green-300' :
                    status === 'sold-out' ? 'bg-red-900 text-red-300' :
                      'bg-yellow-900 text-yellow-300'
                  }`}>
                  {status === 'active' ? 'Available' :
                    status === 'sold-out' ? 'Sold Out' :
                      'Coming Soon'}
                </div>
                {availableSpots > 0 && (
                  <p className="text-sm ml-3 text-white">
                    {availableSpots} spots left out of {maxTravelers}
                  </p>
                )}
              </div>
            </div>

            {/* Registration - Desktop */}
            <div className="hidden md:block bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 mb-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Book This Trip</h3>
              <Registration packageId={travelPackageId || ''} packageTitle={title} />

            </div>

            {/* AI Prompt Generator - Hidden on mibile */}
            <div className="hidden md:block bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-white">Need Help Planning?</h3>
              <AiPromptGenerator />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Form  */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-transparent backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Book This Trip</h3>
              <button
                onClick={toggleMobileForm}
                className="text-white hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Registration packageId={travelPackageId || ''} packageTitle={title} />
          </div>
        </div>
      )}

      {/* Mobile Registertion Button -  on mobile */}
      {status === 'active' && availableSpots > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <button
            onClick={toggleMobileForm}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-center shadow-lg transition-all duration-300 flex justify-center items-center"
          >
            Chat with us
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTravelPackageDetails;
