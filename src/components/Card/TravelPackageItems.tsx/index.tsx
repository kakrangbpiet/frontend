import React from 'react';
import { Skeleton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ITravelPackage } from '../../../redux/slices/Travel/TravelSlice';
import CustomSwiper from '../../Swiper';
import { mockTravelPackages } from './mockData';


interface TravelPackagesProps {
  categoryType?: string;
  loading?: boolean;
  travelPackages?: ITravelPackage[];
}

const TravelPackages: React.FC<TravelPackagesProps> = ({
  travelPackages = mockTravelPackages,
  loading = false
}) => {
  const navigate = useNavigate();

  // Debug logging to verify data
  const handleNavigate = (id: string, title: string) => {
    navigate(`/package/${id}/${title}`);
  };
  const handleNavigateAllPackages = () => {
    navigate(`/packages`);
  };

  // const renderStatusChip = (status?: ITravelPackage['status']) => {
  //   const statusColors: Record<ITravelPackage['status'], 'success' | 'default' | 'error' | 'warning'> = {
  //     'active': 'success',
  //     'inactive': 'default',
  //     'sold-out': 'error',
  //     'coming-soon': 'warning'
  //   };

  //   return (
  //     <Chip
  //       label={status?.toUpperCase()}
  //       color={statusColors[status]}
  //       size="small"
  //       sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
  //     />
  //   );
  // };

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-md py-8" style={{ position: 'relative', zIndex: 5, width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      {/*full width*/}
      <section className="container mx-auto px-4">
        <div className="hover-sw-nav hover-sw-2">
      
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {travelPackages.map((pkg: ITravelPackage) => (
                <div key={pkg.id} className="w-full">
                  <div
                    className="cursor-pointer relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 h-full hover:transform hover:-translate-y-2 hover:shadow-xl"
                    onClick={() => handleNavigate(pkg.id, pkg.title)}
                  >
                    {/* <div className="relative z-10">
                      {renderStatusChip(pkg.status)}
                    </div> */}

                    <div className="h-40 md:h-56 overflow-hidden">
                      {pkg.image ? (
                        <CustomSwiper
                          images={[`data:image/jpeg;base64,${pkg.image}`]}
                        />
                      ) : (
                        // Show skeleton when no image
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="100%"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 0 // Remove rounded corners to match parent container
                          }}
                        />
                      )}
                    </div>

                    <div className="p-3 md:p-4 bg-black/40 backdrop-blur-md text-white border-t border-white/10">
                      {/* Skeleton for title */}
                      {pkg.title ? (
                        <Link
                          to={`/package/${pkg.id}/${pkg.title}`}
                          className="block mb-1 md:mb-2 text-sm md:text-lg font-semibold text-white hover:text-blue-300 no-underline truncate"
                        >
                          {pkg.title}
                        </Link>
                      ) : (
                        <Skeleton
                          width="80%"
                          height={24}
                          sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                        />
                      )}
                      <div className="flex justify-between items-center mt-1 md:mt-2">
                        <div>
                          {/* Skeleton for price */}
                          {/* {pkg.price ? (
                            <>
                              <div className="font-bold text-sm md:text-base text-white">
                                ₹{pkg.price.toLocaleString()}
                              </div>
                              {pkg.originalPrice > 0 && (
                                <span className="text-gray-300 line-through text-sm md:text-base">
                                  ₹{pkg.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <Skeleton
                                width="60%"
                                height={20}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                              />
                              <Skeleton
                                width="40%"
                                height={16}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                              />
                            </>
                          )} */}
                        </div>

                        {/* Skeleton for category */}
                        {pkg.category ? (
                          <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs rounded-full bg-white/20 text-white border border-white/10 backdrop-blur-sm truncate max-w-[80px] md:max-w-none">
                            {pkg.category}
                          </span>
                        ) : (
                          <Skeleton
                            width={60}
                            height={24}
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '12px'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              {loading &&
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full">
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                    </div>
                  ))}
                </div>
              }

          <div className="text-center mt-8">
            <button
              onClick={handleNavigateAllPackages}
              className="inline-block px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              VIEW ALL PACKAGES
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelPackages;