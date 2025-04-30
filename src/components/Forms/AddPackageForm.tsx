import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Grid, IconButton, MenuItem, Select, FormControl, Box, TextField } from '@mui/material';
// import 'react-quill/dist/quill.snow.css';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageUploader from '../ImageUploader';
import { AppDispatch } from '../../redux/store';
import { DateAvailability, ITravelPackage } from '../../redux/slices/Travel/TravelSlice';
// import WYSIWYGEditor from '../WYSWYGEditor';
import CustomTextField from '../CustomTextField';
import { addTravelPackageApi, } from '../../redux/slices/Travel/travelApiSlice';
import locationsData from './Location.json';
import AddIcon from '@mui/icons-material/Add';  // Fixed import
import UnixDateInput from './DatePicker';
import WYSIWYGEditor from '../WYSWYGEditor';

interface AddTravelPackageProps {
  itemInfo?: ITravelPackage;
  formEvent: string;
  userType: string;
}

interface ErrorMessages {
  [key: string]: string;
}

const newErrors: ErrorMessages = {
  title: '',
  location: '',
  category: '',
  status: '',
  image: '',
};

const statusOptions = ['active', 'inactive', 'sold-out', 'coming-soon'];
const travelTypeOptions = ['group', 'private', 'self-guided'];

const AddTravelPackageForm: React.FC<AddTravelPackageProps> = ({ itemInfo, formEvent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<ITravelPackage>(
    itemInfo
      ? itemInfo
      : {
        id: '',
        title: '',
        image: '',
        images: [],
        videos: [],
        location: '',
        category: '',
        status: 'active',
        maxTravelers: undefined,
        availableSpots: undefined,
        travelType: undefined,
        dateAvailabilities: [],
        activities: []
      }
  );

  useEffect(() => {
    if (itemInfo) {
      setFormData(itemInfo);
      setDescription(itemInfo.description || "");
      setDateAvailabilities(itemInfo.dateAvailabilities || []);
      setActivities(itemInfo.activities || []);
    }
  }, [itemInfo]);


  const [description, setDescription] = useState(itemInfo ? itemInfo.description : "");

  const [dateAvailabilities, setDateAvailabilities] = useState<DateAvailability[]>(
    itemInfo?.dateAvailabilities || []
  );

  const [activities, setActivities] = useState<string[]>(itemInfo?.activities || []);
  const [newActivity, setNewActivity] = useState('');


  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages>(newErrors);

  const clearForm = () => {
    setFormData({
      id: '',
      title: '',
      image: '',
      images: [],
      videos: [],
      location: '',
      category: '',
      status: 'active',
      maxTravelers: undefined,
      availableSpots: undefined,
      travelType: undefined,
      dateAvailabilities: [],
      activities: []
    });
    setActivities([]);
    setDescription('');
    setErrors(newErrors);
  };
console.log(itemInfo?.videos);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleAddDateAvailability = () => {
    setDateAvailabilities([
      ...dateAvailabilities,
      {
        startDate: null,
        endDate: null,
        maxTravelers: 10,
        availableSpots: 10,
        price: 0,
        originalPrice: undefined,
      }
    ]);
  };

  const handleRemoveDateAvailability = (index: number) => {
    const updated = [...dateAvailabilities];
    updated.splice(index, 1);
    setDateAvailabilities(updated);
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (index: number) => {
    const updated = [...activities];
    updated.splice(index, 1);
    setActivities(updated);
  };

  const handleDateAvailabilityChange = (index: number, field: keyof DateAvailability, value: any) => {
    const updated = [...dateAvailabilities];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setDateAvailabilities(updated);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    setErrors(newErrors); // Reset errors
    setIsSaving(true);
    event.preventDefault();

    // Validate required fields
    const requiredFields: Array<keyof ITravelPackage> = ['title', 'description', 'location', 'category', 'status', 'image'];
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        }));
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      dispatch(
        addTravelPackageApi({
          newTravelPackageData: {
            ...formData,
            description,
            activities: activities,
            dateAvailabilities: dateAvailabilities.length > 0 ? dateAvailabilities : undefined,
            id: itemInfo?.id || '',
          },
          formEvent,
          clearForm,
          setIsSaving,
        })
      );
    } else {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ITravelPackage) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ITravelPackage) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData({ ...formData, [field]: value });
  };

  // const handleDescriptionChange = (value: string) => {
  //   setFormData({ ...formData, description: value });
  // };

  const handleMainImageUpload = (imageUrl: string) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleGalleryImagesUpload = (imageUrls: string[]) => {
    setFormData({ ...formData, images: imageUrls });
  };
  const handleGalleryVideoUpload = (videoUrls: string[]) => {
    setFormData({ ...formData, videos: videoUrls });
  };

  const areAllFieldsFilled = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.location.trim() &&
      formData.category.trim() &&
      formData.image.trim()
    );
  };

  useEffect(() => {
    const totalTravelers = dateAvailabilities.reduce((sum, d) => sum + d.maxTravelers, 0);
    const totalSpots = dateAvailabilities.reduce((sum, d) => sum + d.availableSpots, 0);
    setFormData((prev) => ({
      ...prev,
      maxTravelers: totalTravelers,
      availableSpots: totalSpots,
    }));
  }, [dateAvailabilities]);

  return (
    <Box sx={{
      background: "white",
      p: 4
    }}>

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          {/* Title - full width */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6">Title</Typography>
            <CustomTextField
              id="title"
              type="text"
              label="Title"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'title')}
              placeholder="Enter title"
              error={errors.title}
              isError={!!errors.title}
              fullWidth
            />
          </Grid>


          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6" gutterBottom>
              Date Availabilities
            </Typography>

            {dateAvailabilities?.map((dateAvailability, index) => (
              <UnixDateInput
                key={index}
                startDate={dateAvailability.startDate}
                endDate={dateAvailability.endDate}
                maxTravelers={dateAvailability.maxTravelers}
                availableSpots={dateAvailability.availableSpots}
                price={dateAvailability.price}
                originalPrice={dateAvailability.originalPrice}
                onStartDateChange={(value) => handleDateAvailabilityChange(index, 'startDate', value)}
                onEndDateChange={(value) => handleDateAvailabilityChange(index, 'endDate', value)}
                onMaxTravelersChange={(value) => handleDateAvailabilityChange(index, 'maxTravelers', value)}
                onAvailableSpotsChange={(value) => handleDateAvailabilityChange(index, 'availableSpots', value)}
                onPriceChange={(value) => handleDateAvailabilityChange(index, 'price', value)}
                onOriginalPriceChange={(value) => handleDateAvailabilityChange(index, 'originalPrice', value)}
                onRemove={() => handleRemoveDateAvailability(index)}
                showRemove={dateAvailabilities.length > 1}
              />
            ))}

            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddDateAvailability}
              sx={{ mt: 2 }}
            >
              Add Date Availability
            </Button>
          </Grid>

          {/* Location and Category in one row */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Location</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value as string })}
                displayEmpty
                error={!!errors.location}
              >
                <MenuItem value="" disabled>
                  Select Location
                </MenuItem>
                {locationsData.locations.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.location && (
              <Typography color="error" variant="body2">
                {errors.location}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Category</Typography>
            <CustomTextField
              id="category"
              type="text"
              label="Category"
              value={formData.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, 'category')}
              placeholder="Enter category"
              error={errors.category}
              isError={!!errors.category}
              fullWidth
            />
          </Grid>

          {/* Status and Travel Type in one row */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Status</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                displayEmpty
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Travel Type</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.travelType || ''}
                onChange={(e) => setFormData({ ...formData, travelType: e.target.value as any })}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Travel Type
                </MenuItem>
                {travelTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Max Travelers and Available Spots in one row */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Max Travelers</Typography>
            <CustomTextField
              id="maxTravelers"
              type="number"
              disable={true}
              label="Max Travelers"
              value={formData.maxTravelers || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleNumberChange(e, 'maxTravelers')}
              placeholder="Enter maximum number of travelers"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Available Spots</Typography>
            <CustomTextField
              id="availableSpots"
              type="number"
              disable={true}

              label="Available Spots"
              value={formData.availableSpots || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleNumberChange(e, 'availableSpots')}
              placeholder="Enter available spots"
              fullWidth
            />
          </Grid>

          {/* Description - full width */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6">Description</Typography>
            <WYSIWYGEditor value={description || ''} onChange={handleDescriptionChange} />
            {errors.description && (
              <Typography color="error" variant="body2">
                {errors.description}
              </Typography>
            )}
          </Grid>

          {/* Images - full width */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6">Main Image</Typography>
            <ImageUploader
              register={handleMainImageUpload}
              uploadFormat="BASE64"
            />
            {errors.image && (
              <Typography color="error" variant="body2">
                {errors.image}
              </Typography>
            )}
            {formData.image && (
              <Box mt={2}>
                <img
                  src={`data:video/mp4;base64,${formData.image}`}
                  alt="Main preview"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </Box>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6">Gallery Images</Typography>
            <ImageUploader
              register={(url) => handleGalleryImagesUpload([...(formData.images || []), url])}
              uploadFormat="BASE64"
            />
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {formData.images?.map((img, index) => (
                <Box key={index} position="relative">
                  <img
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`Gallery ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)'
                    }}
                    onClick={() => {
                      const updatedImages = [...(formData.images || [])];
                      updatedImages.splice(index, 1);
                      setFormData({ ...formData, images: updatedImages });
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="h6">Gallery Videos</Typography>
            <ImageUploader
              register={(url) => handleGalleryVideoUpload([...(formData.videos || []), url])}
              uploadFormat="BASE64"
            />
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {formData?.videos?.map((video, index) => (
                <Box key={index} position="relative">
                  <img
                    src={`data:video/mp4;base64,${video}`}
                    alt={`Gallery ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <IconButton
                    size="small"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'rgba(255,255,255,0.7)'
                    }}
                    onClick={() => {
                      const updatedVideos = [...(formData.videos || [])];
                      updatedVideos.splice(index, 1);
                      setFormData({ ...formData, videos: updatedVideos as string[] });
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Activities</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TextField
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                label="New Activity"
                variant="outlined"
                fullWidth
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddActivity}
                disabled={!newActivity.trim()}
              >
                Add
              </Button>
            </Box>

            {activities.map((activity, index) => (
              <Box key={index} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
                p: 1,
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }}>
                <Typography sx={{ flexGrow: 1 }}>{activity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRemoveActivity(index)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Grid>


          {/* Submit Button - full width */}
          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSaving || !areAllFieldsFilled()}
              fullWidth
              size="large"
            >
              {isSaving ? 'Saving...' : itemInfo ? 'Update Package' : 'Create Package'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddTravelPackageForm;