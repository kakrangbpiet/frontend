import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface MyLocationProps {
  setAddress: (address: string) => void;
  open: boolean;
  handleClose: () => void;
}

function MyLocation({ setAddress, open, handleClose }: MyLocationProps) {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChooseAddress = async () => {
    if (!position) return;
    setLoadingLocation(true);

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${import.meta.env.VITE_GOOGLE_LOCATION_API_KEY}`
      );
      const data = await res.json();
      console.log(data);
      

      if (data.status === 'OK' && data.results.length > 0) {
        setAddress(data.plus_code.compound_code);
        handleClose();
    setLoadingLocation(false);

      } else {
    setLoadingLocation(false);

        setError(data.error_message || 'Failed to get address');
      }
    } catch (err) {
    setLoadingLocation(false);

      setError('Failed to fetch address');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!open) return;

    setLoadingLocation(true);
    setError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (positionInfo) => {
          setPosition({
            latitude: positionInfo.coords.latitude,
            longitude: positionInfo.coords.longitude,
          });
          setLoadingLocation(false);
        },
        (err) => {
          setError('Failed to get your location');
          setLoadingLocation(false);
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not available in your browser');
      setLoadingLocation(false);
    }
  }, [open]);

  useEffect(() => {
    if (position) {
      handleChooseAddress();
    }
  }, [position]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="location-dialog-title"
      PaperProps={{
        style: {
          boxShadow: 'none',
          padding: '20px',
        },
      }}
    >
      <DialogTitle id="location-dialog-title">Detecting your location...</DialogTitle>
      <DialogContent>
        {loadingLocation ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
            <p style={{ marginTop: '16px' }}>Detecting your location...</p>
          </div>
        ) : error ? (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
            <Button onClick={handleClose} variant="contained" color="primary" fullWidth>
              Close
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default MyLocation;