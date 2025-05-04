import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Grid, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageUploader from '../ImageUploader';
import { useDispatch } from 'react-redux';
import { updateTravelPackageImagesApi } from '../../redux/slices/Travel/travelApiSlice';
import { AppDispatch } from '../../redux/store';

interface GalleryImagesDisplayProps {
    images: string[];
    onImagesUpload: (imageUrl: string) => void;
    onRemoveImage: (index: number) => void;
    packageId?: string;
}

const GalleryImagesDisplay: React.FC<GalleryImagesDisplayProps> = ({
    images,
    onImagesUpload,
    onRemoveImage,
    packageId,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [newImages, setNewImages] = useState<string[]>([]);
    const [removedImageIndexes, setRemovedImageIndexes] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageSelect = (selectedImage: string) => {
        if (packageId) {
            setNewImages(prev => [...prev, selectedImage]);
        } else {
            onImagesUpload(selectedImage);
        }
    };

    const handleRemoveImage = (index: number) => {
        if (index < images.length) {
            // Track removed images from original array
            setRemovedImageIndexes(prev => [...prev, index]);
        } else {
            // Remove from new images
            setNewImages(prev => prev.filter((_, i) => i !== index - images.length));
        }
    };

    const handleSaveImages = async () => {
        if (!packageId) return;

        setIsUploading(true);
        try {
            // Filter out removed images and add new ones
            const updatedImages = images
                .filter((_, index) => !removedImageIndexes.includes(index))
                .concat(newImages);

            await dispatch(updateTravelPackageImagesApi({
                packageId,
                images: updatedImages
            })).unwrap();

            // Update parent with all changes
            removedImageIndexes.forEach(() => onRemoveImage(0)); // Parent will handle actual removal
            newImages.forEach(img => onImagesUpload(img));

            // Reset local state
            setNewImages([]);
            setRemovedImageIndexes([]);
        } catch (error) {
            console.error("Failed to update images:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // Determine which images to display
    const displayImages = images
        .filter((_, index) => !removedImageIndexes.includes(index))
        .concat(newImages);

    // Show save button when there are pending changes (new images added or existing images removed)
    const hasPendingChanges = newImages.length > 0 || removedImageIndexes.length > 0;

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>Gallery Images</Typography>

            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>

                    <ImageUploader
                        register={handleImageSelect}
                        uploadFormat="BASE64"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>

                    <Stack spacing={2} alignItems="center">
                        <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                            {displayImages?.map((img, index) => (
                                <Box key={index} position="relative">
                                    <img
                                        src={img.startsWith('data:image') ? img : `${img}`}
                                        alt={`Gallery ${index + 1}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: 'rgba(255,255,255,0.7)',
                                        }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        {packageId && hasPendingChanges && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveImages}
                                disabled={isUploading}
                                fullWidth
                            >
                                {isUploading ? 'Saving...' : 'Save Images'}
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GalleryImagesDisplay;