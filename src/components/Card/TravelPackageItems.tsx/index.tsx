import React from 'react';
import { Box, Typography, Skeleton, Grid, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from "swiper/modules";
import "swiper/css";
import { ITravelPackage } from '../../../redux/slices/Travel/TravelSlice';

interface TravelPackagesProps {
  categoryType?: string;
  loading?: boolean;
  travelPackages?: ITravelPackage[];
}

const TravelPackages: React.FC<TravelPackagesProps> = ({ categoryType,travelPackages,loading }) => {
  const navigate = useNavigate();



  const handleNavigate = (id: string) => {
    navigate(`/package/${id}`);
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
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
      />
    );
  };

  return (
    <div className="container">
      <div className="flat-title mb-0 wow fadeInUp" data-wow-delay="0s">
        <div className="flex flex-1 items-center gap-10 align-items-center">
          <div className={`nav-prev-slider nav-prev-product ${categoryType}snbp114`}>
            <span className="icon icon-arrow1-left" />
          </div>
          <Link
            to="/travel-packages"
            className="tf-btn btn-line m-0 fs-12 fw-6 mt-0"
          >
            <Typography>
              VIEW ALL
            </Typography>
          </Link>
          <div className={`nav-next-slider nav-next-product ${categoryType}snbn114`}>
            <span className="icon icon-arrow1-right" />
          </div>
        </div>
      </div>
      <section className="flat-spacing-0 pt-0 ml-[auto]">
        <div className="">
          <div className="hover-sw-nav hover-sw-2">
            {loading ? (
              <Grid container spacing={2}>
                {[...Array(3)].map((_, index) => (
                  <Grid size={{xs:12,md:4}} key={index}>
                    <Skeleton variant="rectangular" height={250} sx={{ mt: 4 }} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Swiper
                dir="ltr"
                className="swiper tf-sw-product-sell wrap-sw-over"
                style={{ height: "450px" }}
                slidesPerView={4}
                spaceBetween={30}
                breakpoints={{
                  1024: { slidesPerView: 4 },
                  640: { slidesPerView: 3 },
                  0: { slidesPerView: 2, spaceBetween: 15 },
                }}
                modules={[Navigation]}
                navigation={{
                  prevEl: `.${categoryType}snbp114`,
                  nextEl: `.${categoryType}snbn114`,
                }}
              >
                {travelPackages.map((pkg: ITravelPackage) => (
                  <SwiperSlide key={pkg.id}>
                    <div className="card-product fl-item" style={{ position: 'relative' }}>
                      {renderStatusChip(pkg.status)}
                      <div className="card-product-wrapper">
                        <Box 
                          sx={{ 
                            maxWidth: "230px",
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '8px'
                          }} 
                          onClick={() => handleNavigate(pkg.id)}
                        >
                          <img
                            className="lazyload img-product"
                            src={`data:image/jpeg;base64,${pkg.image}`} 
                            alt={pkg.title}
                            style={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '8px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                            color: 'white'
                          }}>
                            <Typography variant="subtitle2">{pkg.location}</Typography>
                          </div>
                        </Box>
                        <div className="card-product-info" style={{ padding: '12px' }}>
                          <Typography 
                            variant="h6" 
                            component={Link} 
                            to={`/package/${pkg.id}`}
                            sx={{ 
                              display: 'block',
                              mb: 1,
                              color: 'text.primary',
                              textDecoration: 'none',
                              '&:hover': { color: 'primary.main' }
                            }}
                          >
                            {pkg.title}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body1" fontWeight="bold">
                              ₹{pkg.price.toFixed(2)}
                            </Typography>
                            {pkg.originalPrice && (
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                ₹{pkg.originalPrice.toFixed(2)}
                              </Typography>
                            )}
                          </Box>
                          {pkg.category && (
                            <Chip 
                              label={pkg.category} 
                              size="small" 
                              sx={{ mt: 1, bgcolor: 'primary.light', color: 'primary.contrastText' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelPackages;