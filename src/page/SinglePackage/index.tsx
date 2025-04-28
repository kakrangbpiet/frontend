import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { selectUserType } from '../../redux/slices/login/authSlice';
import { fetchSingleTravelPackageApi, fetchTravelItemRandomVideoApi, fetchTravelItemVideosApi, fetchTravelPackageDatesApi, updateTravelPackageStatus } from '../../redux/slices/Travel/travelApiSlice';
import { ITravelPackage, selectFieldLoading, selectPackageDates, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice';
import { TravelPackageStatus, UserCategory } from '../../Datatypes/Enums/UserEnums';
import AiPromptGenerator from '../../components/AiPrompt/AiPrompt';
import Registration from '../../components/Registration';
import { MediaBackground } from './bgRenderer';
import AddTravelPackageForm from '../../components/Forms/AddPackageForm';
import { DateAvailabilityDisplay } from './DateAvailability';
import FullScreenGallery from './FullScreenGallery';
import { setActiveHistory } from '../../redux/slices/AI/AiSlice';
import { parseHTML, renderCustomStyles } from '../../scripts/handleTravelItemcss';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const SingleTravelPackageDetails = () => {
  const { travelPackageTitle, travelPackageId } = useParams<{ travelPackageTitle: string; travelPackageId: string }>();

  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', index: number }>({ type: 'image', index: 0 });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const userType = useSelector(selectUserType);

  const isDescriptionLoading = useSelector(selectFieldLoading('description'));
  const isImageLoading = useSelector(selectFieldLoading('image'));
  const isImagesLoading = useSelector(selectFieldLoading('images'));
  const isVideosLoading = useSelector(selectFieldLoading('videos'));

  // Fetch from Redux 
  const selectedTravelPackage = useSelector(useSelectedTravelPackage(travelPackageId)) as ITravelPackage | undefined;
  useEffect(() => {
    dispatch(fetchTravelItemRandomVideoApi({ itemId: travelPackageId }));
    dispatch(setActiveHistory(travelPackageId))
  }, [dispatch]);

  // Staggered loading pattern
  useEffect(() => {
    if (userType === UserCategory.KAKRAN_SUPER_ADMIN) {
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
      }));
    }
    else {
      // First load essential fields
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
        select: "title,description,status"
      }));
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
        select: "image,status,dateAvailabilities"
      }));

    }
    // Finally load dates and other secondary data
    dispatch(fetchTravelPackageDatesApi({ packageId: travelPackageId }));

  }, [dispatch]);

  // Handle photos tab click - load full images if not already loaded
  useEffect(() => {
    if (activeTab === 'photos') {
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
        select: "images"
      }));
      dispatch(fetchTravelItemVideosApi({
        itemId: travelPackageId,
      }));
    }
  }, [activeTab, dispatch]);

  const packageData = selectedTravelPackage;

  // Default values and null checks
  const description = packageData?.description ?? '';
  const dateAvailabilities = useSelector(selectPackageDates(travelPackageId)) ?? [];
  const image = packageData?.image ?? '';
  const images = packageData?.images ?? [image];
  const videos = packageData?.videos ?? [];
  const title = packageData?.title ?? travelPackageTitle ?? '';
  const location = packageData?.location ?? '';
  const category = packageData?.category ?? '';
  const status = packageData?.status ?? 'inactive';
  const availableSpots = packageData?.availableSpots ?? 0;
  const travelType = packageData?.travelType ?? 'group';
  const maxTravelers = packageData?.maxTravelers ?? 0;
  const activities = packageData?.activities ?? null;
  console.log(videos);

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

  // Admin view
  if (userType === UserCategory.KAKRAN_SUPER_ADMIN) {
    return (
      <div className="min-h-screen w-full bg-transparent pt-26">
        <div className="max-w-6xl mx-auto mt-6 flex flex-wrap justify-between items-center space-x-2 mb-4">
          {status && <button
            disabled={isUpdating}
            onClick={status === 'inactive' ? approveTravelPackage : pauseTravelPackage}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg shadow-lg disabled:opacity-50 transition duration-300 font-medium"
          >
            {status === 'inactive' ? 'Activate' : 'Deactivate'}
          </button>
          }

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
              dateAvailabilities,
              activities
            }} userType={userType} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        {videos &&
          <MediaBackground video={videos.randomVideo} />
        }
      </div>
      <div className="absolute inset-0 overflow-hidden">
      </div>
      <div className="backdrop-blur-[4px] bg-black/40 min-h-screen pt-16 md:pt-24">
        <div className="max-w-[95%] md:max-w-[90%] mx-auto px-2 md:px-4 py-8 md:py-12">
          <div className="relative rounded-xl overflow-hidden mb-8 md:mb-12 shadow-2xl h-64 md:h-96 object-cover">
            {isImageLoading && !image ? (
              <Skeleton variant="rectangular" height={400} />
            ) : (
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
              <div className="p-4 md:p-10 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  {title}
                </h1>
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
                  {isDescriptionLoading && !description ? (
                    <Skeleton variant="text" width="80%" />
                  ) : (
                    <div>
                      {parseHTML(description).map((node, index) => renderCustomStyles(node, index))}
                    </div>
                  )}

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
                  {activities && activities.length > 0 &&
                    <>
                      <h3 className="text-lg md:text-xl font-semibold text-emerald-300 mb-4">
                        Activities to Enjoy
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {activities?.map((activity, index) => (
                          <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-4 text-center border border-white/20 shadow-md hover:bg-white/20 transition-all transform hover:scale-105 duration-300 text-sm md:text-base"
                          >
                            <span className="block font-medium">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  }

                </div>
              )}

              {activeTab === 'photos' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">

                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer group relative"
                        onClick={() => {
                          setSelectedMedia({ type: 'image', index });
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
                    {isImagesLoading &&
                      <>
                        {[...Array(4)].map((_, index) => (
                          <div key={index} className="w-full">
                            <Skeleton variant="rectangular" height={260} />
                          </div>
                        ))}
                      </>
                    }
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Video Gallery</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos && videos?.allVideos?.map((vid, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer group relative"
                        onClick={() => {
                          setSelectedMedia({ type: 'video', index });
                          setGalleryOpen(true);
                        }}
                      >
                        <div className='w-full h-48 md:h-64 object-cover'>
                          <StyledVideo
                            src={`data:video/mp4;base64,${vid?.base64Data}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>

                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isVideosLoading &&
                      <>
                        {[...Array(4)].map((_, index) => (
                          <div key={index} className="w-full">
                            <Skeleton variant="rectangular" height={260} />
                          </div>
                        ))}
                      </>
                    }
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
                        title: selectedTravelPackage?.title,
                        description: selectedTravelPackage?.description,
                        location: selectedTravelPackage?.location,
                        category: selectedTravelPackage?.category,
                        travelType: selectedTravelPackage?.travelType,
                        availableSpots: selectedTravelPackage?.availableSpots,
                        maxTravelers: selectedTravelPackage?.maxTravelers,
                        availableDates: selectedTravelPackage?.dateAvailabilities,
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

              {activeTab === 'dates' && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Available Dates</h2>
                  <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} />
                </div>
              )}
            </div>

            {/* Hide travel inquiry form on mobile - only show in desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <Registration packageId={travelPackageId || ''} packageTitle={travelPackageTitle} />
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
        videos={videos?.allVideos || []}
        isOpen={galleryOpen}
        initialMedia={selectedMedia}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

export default SingleTravelPackageDetails;