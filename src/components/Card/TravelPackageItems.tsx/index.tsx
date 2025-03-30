import React from 'react';
import { Box, Typography, Skeleton, Grid, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ITravelPackage } from '../../../redux/slices/Travel/TravelSlice';
import CustomSwiper from '../../Swiper';

interface TravelPackagesProps {
  categoryType?: string;
  loading?: boolean;
  travelPackages?: ITravelPackage[];
}

const TravelPackages: React.FC<TravelPackagesProps> = ({  travelPackages, loading }) => {
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
    <div className="">
     
      
      <section className="flat-spacing-0 pt-0">
        <div className="hover-sw-nav hover-sw-2">
          {loading ? (
            <Grid container spacing={3}>
              {[...Array(3)].map((_, index) => (
                <Grid  size={{ xs: 12, md: 4 }} key={index}>
                  <Skeleton variant="rectangular" height={350} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {travelPackages?.map((pkg: ITravelPackage) => (
                <Grid  size={{ xs: 12, sm:6, md: 4,lg:3 }} key={pkg.id}>
                  <div className=" ">
                    <Box sx={{ position: 'relative',zIndex:"" }}>
                      <Box
                        sx={{
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '18px',
                        }}
                        onClick={() => handleNavigate(pkg.id)}
                        >
                          <Box  sx={{ position: 'relative',zIndex:"400" }}>
                        {renderStatusChip(pkg.status)}

                          </Box>
                        <CustomSwiper images={pkg.images.map(img => `data:image/png;base64,${img}`)} />

                        <Box sx={{
                          p: 2,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          color: 'white'
                        }}>
                          <Typography
                            variant="h6"
                            component={Link}
                            to={`/package/${pkg.id}`}
                            sx={{
                              display: 'block',
                              mb: 1,
                              color: 'white',
                              textDecoration: 'none',
                              '&:hover': { color: 'primary.main' }
                            }}
                          >
                            {pkg.title}
                          </Typography>
                          <Box display="flex" justifyContent="center" gap={1} alignItems="center">
                            <Typography variant="body1" fontWeight="bold" color="white">
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
                        </Box>
                      </Box>
                    </Box>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link
              to="/travel-packages"
              className="tf-btn btn-line m-0 fs-12 fw-6 mt-0"
            >
              <Typography>
                VIEW ALL
              </Typography>
            </Link>
          </Box>
        </div>
      </section>
    </div>
  );
};

export default TravelPackages;