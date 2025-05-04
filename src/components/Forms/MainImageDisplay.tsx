import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Grid } from '@mui/material';
import ImageUploader from '../ImageUploader';
import { useDispatch } from 'react-redux';
import { updateTravelPackageImageApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';

interface MainImageDisplayProps {
    image: string;
    onImageUpload: (imageUrl: string) => void;
    error?: string;
    packageId?: string;
}

const MainImageDisplay: React.FC<MainImageDisplayProps> = ({ image, onImageUpload, error, packageId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [newImage, setNewImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageSelect = (selectedImage: string) => {
        if (packageId) {
            setNewImage(selectedImage);
        } else {
            onImageUpload(selectedImage);
        }
    };

    const handleSaveImage = async () => {
        if (!packageId || !newImage) return;

        setIsUploading(true);
        try {
            await dispatch(updateTravelPackageImageApi({
                packageId,
                image: newImage
            })).unwrap();
            setNewImage(null);
        } catch (error) {
            console.error("Failed to update image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const displayImage = newImage || image;

    return (
               <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>Main Image</Typography>

            <Grid container spacing={4} alignItems="center">
            <Grid size={{xs:12, md:6}}>
                    <ImageUploader
                        register={handleImageSelect}
                        uploadFormat="BASE64"
                    />
                </Grid>

                <Grid size={{xs:12, md:6}}>
                    <Stack spacing={2} alignItems="center">
                        {displayImage && (
                            <Box
                                component="img"
                                src={displayImage.startsWith('data:image')
                                    ? displayImage
                                    : `${displayImage}?${new Date().getTime()}`}
                                alt="Main preview"
                                sx={{
                                    width: '100%',
                                    maxHeight: 240,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    boxShadow: 1,
                                }}
                            />
                        )}

                        {newImage && packageId && (
                            
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveImage}
                                disabled={isUploading}
                                fullWidth
                            >
                                {isUploading ? 'Saving...' : 'Save Image'}
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>

            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default MainImageDisplay;
