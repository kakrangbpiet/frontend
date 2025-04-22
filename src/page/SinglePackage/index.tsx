import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { selectUserType } from '../../redux/slices/login/authSlice';
import { fetchSingleTravelPackageApi, fetchTravelItemVideosApi, updateTravelPackageStatus } from '../../redux/slices/Travel/travelApiSlice';
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const userType = useSelector(selectUserType);

  // Fetch from Redux 
  const selectedTravelPackage = useSelector(useSelectedTravelPackage(travelPackageId)) as ITravelPackage | undefined;
  useEffect(() => {
    dispatch(fetchTravelItemVideosApi({ itemId: travelPackageId }));
  }, [dispatch]);

  useEffect(() => {
    //mock
    const foundPackage = mockTravelPackages.find(pkg => pkg.id === travelPackageId);
    setMockPackage(foundPackage);

    // db
    if (travelPackageId) {
      dispatch(fetchSingleTravelPackageApi({
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
  const videos = packageData?.videos ?? [];
  const title = packageData?.title ?? travelPackageTitle ?? '';
  const location = packageData?.title ?? '';
  const category = packageData?.category ?? '';
  const status = packageData?.status ?? 'inactive';
  const availableSpots = packageData?.availableSpots ?? 0;
  const travelType = packageData?.travelType ?? 'group';
  const price = packageData?.price ?? 0;
  const originalPrice = packageData?.originalPrice;
  const maxTravelers = packageData?.maxTravelers ?? 0;
console.log(videos)
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
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg shadow-lg disabled:opacity-50 transition duration-300 font-medium"
          >
            {status === 'inactive' ? 'Activate' : 'Deactivate'}
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
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
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div className="absolute inset-0 overflow-hidden">
<div className="absolute inset-0 overflow-hidden">
  {videos.length > 0 &&
    <MediaBackground video={{ base64Data: videos[0] }} /> 
}
</div>
      </div>
      <div className="backdrop-blur-[4px] bg-black/40 min-h-screen pt-24">
        <div className="max-w-[90%] mx-auto px-4 py-12">
          <div className="relative rounded-xl overflow-hidden mb-12 shadow-2xl">
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt={title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
              <div className="p-10 text-white">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-xl max-w-3xl drop-shadow-md">
                  {description.length > 120 ? description.substring(0, 120) + '...' : description}
                </p>
              </div>
            </div>
            <button
              onClick={navigateToHome}
              className="absolute top-6 left-6 px-5 py-2.5 bg-black/40 hover:bg-black/60 backdrop-filter backdrop-blur-md rounded-lg text-white flex items-center gap-2 border border-white/10 transition-all duration-300 shadow-lg"
            >
              Back to Home
            </button>
          </div>

          {/* Tabs Navigation */}
          <div className="flex mb-8 overflow-x-auto bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20 shadow-lg">
            {['overview', 'photos', 'highlights', 'dates'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-white font-medium rounded-lg transition flex-none ${activeTab === tab
                    ? 'bg-white/20 shadow-md border border-white/30'
                    : 'hover:bg-white/10 border border-transparent'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-12 flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4 lg:pr-8">
              {activeTab === 'overview' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
                    About {title}
                  </h2>
                  <p className="mb-6">{description || `Experience the beauty and adventure of ${location} with this exclusive travel package. Perfect for those seeking an unforgettable journey.`}</p>
                  <p className="mb-6">Set in stunning surroundings, this destination offers a perfect blend of relaxation and adventure, making it ideal for travelers of all kinds.</p>

                  <div className="relative mb-8 rounded-lg overflow-hidden shadow-md bg-black/50 transform hover:scale-[1.01] transition duration-500 cursor-pointer">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={`data:image/jpeg;base64,${images[0] || image}`}
                          alt={`${title} video thumbnail`}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                          <p className="text-white font-medium">
                            Experience the magic of {title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-emerald-300 mb-4">
                    Activities to Enjoy
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['River rafting', 'Paragliding', 'Skiing', 'Trekking', 'Mountain biking'].map((activity, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center border border-white/20 shadow-md hover:bg-white/20 transition-all transform hover:scale-105 duration-300"
                      >
                        <span className="block text-sm font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer group relative"
                      >
                        <img
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`${title} - image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Package Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">Duration:  Days,  Nights</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">Category: {category}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">Travel Type: {travelType}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">Location: {location}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">All-inclusive package</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white">Professional tour guides</p>
                    </div>
                  </div>


                  {/*To add more space div , rmoveable but would be better if add added to protect from view area */}
                  <h3 className="text-xl font-semibold text-emerald-300 mb-4">Included Services</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Accommodation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Daily breakfast and dinner
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Transportation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Guided tours
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'dates' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-semibold text-emerald-300 mb-6">Available Dates</h2>
                  <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} />
                </div>
              )}
            </div>

  
                <Registration packageId={travelPackageId || ''} packageTitle={title} />
 
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20 shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-emerald-300">Package Details</h3>

            <div className="flex items-end gap-3 mb-4">
              {originalPrice && (
                <span className="text-gray-300 line-through">₹{originalPrice.toLocaleString()}</span>
              )}
              <span className="text-3xl font-bold text-emerald-400">₹{price.toLocaleString()}</span>
            </div>

            {dateAvailabilities.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-300">Next available:</p>
                <p className="text-white font-medium">
                  {formatDate(dateAvailabilities[0].startDate)} - {formatDate(dateAvailabilities[0].endDate)}
                </p>
              </div>
            )}

            <div className="flex items-center mb-6">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'active' ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-700' :
                  status === 'sold-out' ? 'bg-red-900/70 text-red-300 border border-red-700' :
                    'bg-yellow-900/70 text-yellow-300 border border-yellow-700'
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

          <div className="mb-12 bg-gradient-to-r from-blue-800/60 to-indigo-800/60 backdrop-blur-md rounded-xl p-8 text-white border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">Need Help Planning Your Trip?</h2>
                <p className="text-gray-200 mb-4">Our AI travel assistant can help you customize your experience, answer questions about destinations, and provide personalized recommendations.</p>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="text-white">Get instant answers</p>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="text-white">Personalized suggestions</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="text-white">24/7 virtual assistance</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-emerald-300">Ask Our AI Assistant</h3>
                <AiPromptGenerator />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-emerald-300">Book This Trip</h3>
              <button
                onClick={toggleMobileForm}
                className="text-white hover:text-gray-300 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Registration packageId={travelPackageId || ''} packageTitle={title} />
          </div>
        </div>
      )}

      {/* Mobile Book Now Button */}
      {status === 'active' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <button
            onClick={toggleMobileForm}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg text-center shadow-lg transition-all flex justify-center items-center transform hover:translate-y-0.5 duration-300 border border-emerald-500"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTravelPackageDetails;