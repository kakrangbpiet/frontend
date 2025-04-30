import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { selectUserType } from '../../redux/slices/login/authSlice';
import { fetchSingleTravelPackageApi, fetchTravelItemRandomVideoApi, fetchTravelItemVideosApi, fetchTravelPackageDatesApi } from '../../redux/slices/Travel/travelApiSlice';
import { ITravelPackage, selectFieldLoading, selectPackageDates, useSelectedTravelPackage } from '../../redux/slices/Travel/TravelSlice';
import { UserCategory } from '../../Datatypes/Enums/UserEnums';
import AiPromptGenerator from '../../components/AiPrompt/AiPrompt';
import { MediaBackground } from './bgRenderer';
import { DateAvailabilityDisplay } from './DateAvailability';
import FullScreenGallery from './FullScreenGallery';
import { setActiveHistory } from '../../redux/slices/AI/AiSlice';
import { parseHTML, renderCustomStyles } from '../../scripts/handleTravelItemcss';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import {
  useMediaQuery,
  useTheme
} from '@mui/material';
import TravelInquiryForm from '../../components/Registration/Stepper';
import FormDialog from '../../components/Registration/FormDailog';

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
    useEffect(() => {
      if(userType === UserCategory.KAKRAN_SUPER_ADMIN) {
        navigate(`/addTravelPackage/${travelPackageId}`); 
      }
    }, [dispatch, userType, travelPackageId, navigate]);
  // Staggered loading pattern
  useEffect(() => {
    if (userType  && userType === UserCategory.KAKRAN_SUPER_ADMIN) {
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
      }));
    } else {
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
        select: "title,description,status"
      }));
      dispatch(fetchSingleTravelPackageApi({
        itemId: travelPackageId,
        select: "image,status,dateAvailabilities,activities"
      }));
    }
    dispatch(fetchTravelPackageDatesApi({ packageId: travelPackageId }));
  }, [dispatch,userType,travelPackageId]);
  

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
  }, [activeTab, dispatch,travelPackageId]);

  const navigateToHome = () => {
    navigate("/");
  };

  const toggleMobileForm = () => {
    setShowMobileForm(!showMobileForm);
  };


  // Default values and null checks
  const description = selectedTravelPackage?.description ?? '';
  const dateAvailabilities = useSelector(selectPackageDates(travelPackageId)) ?? [];
  const image = selectedTravelPackage?.image ?? '';
  const images = selectedTravelPackage?.images ?? [image];
  const videos = selectedTravelPackage?.videos ?? [];
  const title = selectedTravelPackage?.title ?? travelPackageTitle ?? '';
  const status = selectedTravelPackage?.status ?? 'inactive';
  const activities = selectedTravelPackage?.activities ?? null;



  return (
    <div className="">
      {videos &&
        <MediaBackground video={videos.randomVideo} />
      }
      <div className="">
      <div className="backdrop-blur-[4px]  min-h-screen pt-6 md:pt-2">
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
            <div className="w-full lg:w-2/3 lg:pr-8">
              {activeTab === 'overview' && (
                <div className="bg-black/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
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
                            className="bg-black/10 backdrop-blur-md rounded-lg p-2 md:p-4 text-center border border-white/20 shadow-md hover:bg-white/20 transition-all transform hover:scale-105 duration-300 text-sm md:text-base"
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
                <div className="bg-black/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">

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
                    <div className="w-full  bg-black/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 shadow-xl">
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
                <div className="bg-black/10 backdrop-blur-md rounded-xl p-4 md:p-8 text-white border border-white/20 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold text-emerald-300 mb-4 md:mb-6">Available Dates</h2>
                  <DateAvailabilityDisplay dateAvailabilities={dateAvailabilities} />
                </div>
              )}
            </div>
            {/* Hide travel inquiry form on mobile - only show in desktop */}
            <div className="hidden lg:block lg:w-1/3">
              <TravelInquiryForm packageId={travelPackageId || ''} packageTitle={travelPackageTitle} />
            </div>

          </div>

        </div>

      </div>

      {/* Mobile Form Modal  */}
      <FormDialog
        open={showMobileForm}
        onClose={toggleMobileForm}
        fullScreen={useMediaQuery(useTheme().breakpoints.down('sm'))}
        maxWidth="md"
      >
        <TravelInquiryForm packageId={travelPackageId || ''} packageTitle={title} />
      </FormDialog>
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
    </div>
  );
};

export default SingleTravelPackageDetails;