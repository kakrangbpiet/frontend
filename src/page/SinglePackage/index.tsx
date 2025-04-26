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
import { DateAvailabilityDisplay } from './DateAvailability';
import FullScreenGallery from './FullScreenGallery';
import { setActiveHistory } from '../../redux/slices/AI/AiSlice';

const SingleTravelPackageDetails = () => {
  const { travelPackageTitle, travelPackageId } = useParams<{ travelPackageTitle: string; travelPackageId: string }>();

  const [mockPackage, setMockPackage] = useState<ITravelPackage | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileForm, setShowMobileForm] = useState(false);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const userType = useSelector(selectUserType);

  // Fetch from Redux 
  const selectedTravelPackage = useSelector(useSelectedTravelPackage(travelPackageId)) as ITravelPackage | undefined;
  useEffect(() => {
    dispatch(fetchTravelItemVideosApi({ itemId: travelPackageId }));
    dispatch(setActiveHistory(travelPackageId))
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
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg shadow-lg disabled:opacity-50 transition duration-300 font-medium"
          >
            {status === 'inactive' ? 'Activate' : 'Deactivate'}
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
            <AddTravelPackageForm formEvent={"EDIT"} itemInfo={{
              id: travelPackageId,
              title,
              description,
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
    <div className="">
      <div className="">
        {videos.length > 0 &&
          <MediaBackground video={{ base64Data: videos[0] }} />
        }
      </div>
      <div className="absolute inset-0 overflow-hidden">
      </div>
      <div className="backdrop-blur-[4px] bg-black/40 min-h-screen pt-16 md:pt-24">
        <div className="max-w-[95%] md:max-w-[90%] mx-auto px-2 md:px-4 py-8 md:py-12">
          <div className="relative rounded-xl overflow-hidden mb-8 md:mb-12 shadow-2xl">
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt={title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
              <div className="p-4 md:p-10 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-lg md:text-xl max-w-3xl drop-shadow-md hidden md:block">
                  {description.length > 120 ? description.substring(0, 120) + '...' : description}
                </p>
              </div>
            </div>
            <button
              onClick={navigateToHome}
              className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 md:px-5 md:py-2.5 bg-black/40 hover:bg-black/60 backdrop-filter backdrop-blur-md rounded-lg text-white flex items-center gap-2 border border-white/10 transition-all duration-300 shadow-lg text-sm md:text-base"
            >
              Back to Home
            </button>
          </div>

          {/* Tabs Navigation - Scrollable on mobile */}
          <div className="flex mb-6 md:mb-8 overflow-x-auto bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/20 shadow-lg">
            {['overview', 'photos', 'Ask Ai', 'dates'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 md:px-6 md:py-3 text-white font-medium rounded-lg transition flex-none text-sm md:text-base whitespace-nowrap ${activeTab === tab
                  ? 'bg-white/20 shadow-md border border-white/30'
                  : 'hover:bg-white/10 border border-transparent'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="mb-8 md:mb-12 flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4 lg:pr-8">
              {activeTab === 'overview' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4">
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

                  <h3 className="text-lg md:text-xl font-semibold text-emerald-300 mb-4">
                    Activities to Enjoy
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {['River rafting', 'Paragliding', 'Skiing', 'Trekking', 'Mountain biking'].map((activity, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-4 text-center border border-white/20 shadow-md hover:bg-white/20 transition-all transform hover:scale-105 duration-300 text-sm md:text-base"
                      >
                        <span className="block font-medium">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer group relative"
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setGalleryOpen(true);
                        }}
                      >
                        <img
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`${title} - image ${index + 1}`}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Ask Ai' && (
                <div className="mb-8 md:mb-12 bg-gradient-to-r from-blue-800/60 to-indigo-800/60 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="md:flex-row items-center">
                    <div className="w-full  mb-4 md:mb-0 md:pr-6 lg:pr-8">
                      <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white">Need Help Planning Your Trip?</h2>
                    </div>
                    <div className="w-full  bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-xl">
                      <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-emerald-300">Ask Our AI Assistant</h3>
                      <AiPromptGenerator data={{
                        title:selectedTravelPackage.title,
                        description:selectedTravelPackage.description,
                        location:selectedTravelPackage.location,
                        category:selectedTravelPackage.category,
                        travelType:selectedTravelPackage.travelType,
                        availableSpots:selectedTravelPackage.availableSpots,
                        maxTravelers:selectedTravelPackage.maxTravelers,
                        availableDates:selectedTravelPackage.dateAvailabilities,
                      }} />
                    </div>

                  </div>
                  <p className="text-gray-200 mb-3 md:mb-4 text-sm md:text-base pt-6">Our AI travel assistant can help you customize your experience, answer questions about destinations, and provide personalized recommendations.</p>
                  <div className="flex items-center space-x-2 mb-2 md:mb-6">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
                    <p className="text-white text-sm md:text-base">Get instant answers</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2 md:mb-6">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
                    <p className="text-white text-sm md:text-base">Personalized suggestions</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
                    <p className="text-white text-sm md:text-base">24/7 virtual assistance</p>
                  </div>
                </div>
              )}
              {/* {activeTab === 'highlights' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Package Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">Duration:  Days,  Nights</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">Category: {category}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">Travel Type: {travelType}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">Location: {location}</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">All-inclusive package</p>
                    </div>
                    <div className="flex items-center gap-3 hover:bg-white/5 p-2 md:p-3 rounded-lg transition-all duration-300">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <p className="text-white text-sm md:text-base">Professional tour guides</p>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-emerald-300 mb-3 md:mb-4">
                    Included Services
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-white text-sm md:text-base">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Accommodation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Daily breakfast and dinner
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Transportation
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Guided tours
                    </li>
                  </ul>
                </div>
              )} */}

              {activeTab === 'dates' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Available Dates</h2>
                  <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} />
                </div>
              )}
            </div>

            {/* Hide travel inquiry form on mobile - only show in desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <Registration packageId={travelPackageId || ''} packageTitle={title} />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Form Modal  */}
      {showMobileForm && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-100 flex items-center justify-center p-2 backdrop-blur-3xl">
          {/* change 3xl for more blur for minimum use lg/xl  */}
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-auto rounded-xl">
            <button
              onClick={toggleMobileForm}
              className="absolute top-2 right-2 z-10 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300"
              aria-label="Close form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Registration packageId={travelPackageId || ''} packageTitle={title} />
          </div>
        </div>
      )}
      {/* Mobile Book Now Button - fixed at bottom */}
      {status === 'active' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent z-30">
          <button
            onClick={toggleMobileForm}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium rounded-lg text-center shadow-lg transition-all flex justify-center items-center transform hover:translate-y-0.5 duration-300 border border-emerald-500 text-base"
          >
            Book Now
          </button>
        </div>
      )}
      <FullScreenGallery
        images={images}
        isOpen={galleryOpen}
        initialIndex={selectedImageIndex}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

export default SingleTravelPackageDetails;