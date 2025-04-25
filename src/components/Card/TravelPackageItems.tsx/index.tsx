import React from 'react';
import { Skeleton, Chip } from '@mui/material';
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
  console.log("Travel packages being rendered:", travelPackages);

  const handleNavigate = (id: string, title: string) => {
    navigate(`/package/${id}/${title}`);
  };
  const handleNavigateAllPackages = () => {
    navigate(`/packages`);
  };

  const renderStatusChip = (status: ITravelPackage['status']) => {
    const statusColors: Record<ITravelPackage['status'], 'success' | 'default' | 'error' | 'warning'> = {
      'active': 'success',
      'inactive': 'default',
      'sold-out': 'error',
      'coming-soon': 'warning'
    };

    return (
      <Chip
        label={status.toUpperCase()}
        color={statusColors[status]}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
      />
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-md py-8" style={{ position: 'relative', zIndex: 5, width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      {/*full width*/}
      <section className="container mx-auto px-4">
        <div className="hover-sw-nav hover-sw-2">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-full">
                  <Skeleton variant="rectangular" height={350} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </div>
              ))}
            </div>
          ) : travelPackages.length === 0 ? (
            <div className="text-white p-4 border border-white/20 rounded text-center">
              No packages found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {travelPackages.map((pkg: ITravelPackage) => (
                <div key={pkg.id} className="w-full">
                  <div 
                    className="cursor-pointer relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 h-full hover:transform hover:-translate-y-2 hover:shadow-xl"
                    onClick={() => handleNavigate(pkg.id, pkg.title)}
                  >
                    <div className="relative z-10">
                      {renderStatusChip(pkg.status)}
                    </div>
                    
                    <div className="h-56 overflow-hidden">
                      {pkg.images && pkg.images.length > 0 ? (
                        <CustomSwiper 
                          images={pkg.images.map(img => 
                             `data:image/jpeg;base64,${img}` 
                          )} 
                        />
                      ) : (
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="p-4 bg-black/40 backdrop-blur-md text-white border-t border-white/10">
                      <Link 
                        to={`/package/${pkg.id}/${pkg.title}`}
                        className="block mb-2 text-lg font-semibold text-white hover:text-blue-300 no-underline"
                      >
                        {pkg.title}
                      </Link>
                      
                      {pkg.location && (
                        <div className="mb-2 text-sm text-white/80">
                          <span>📍 {pkg.location}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <div className="font-bold text-white">
                            ₹{pkg.price.toLocaleString()}
                          </div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-white/70 line-through">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        
                        {pkg.category && (
                          <span className="px-2 py-1 text-xs rounded-full bg-white/20 text-white border border-white/10 backdrop-blur-sm">
                            {pkg.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
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