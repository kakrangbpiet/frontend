import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Stack, IconButton } from '@mui/material';
import ImageUploader from '../ImageUploader';
import RemoveIcon from '@mui/icons-material/Remove';
import { IVideosResponse } from '../../redux/slices/Travel/TravelSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateTravelPackageVideosApi } from '../../redux/slices/Travel/travelApiSlice';

interface GalleryVideosDisplayProps {
    packageId?: string;
    videos: IVideosResponse;
    onVideosUpload: (videoUrl: string) => void;
    onRemoveVideo: (index: number) => void;
    isPackageSaved?: boolean;
}

const GalleryVideosDisplay: React.FC<GalleryVideosDisplayProps> = ({
    packageId,
    videos,
    onVideosUpload,
    // onRemoveVideo,
}) => {
    console.log(videos, 'videos');
    
    const dispatch = useDispatch<AppDispatch>();
    const [newVideos, setNewVideos] = useState<string[]>([]);
    const [removedVideoIndexes, setRemovedVideoIndexes] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const originalVideoUrls =videos?.allVideos?.length>0 ? videos?.allVideos?.map((v) => v?.awsUrl).filter(url => url) : [];

    const handleVideoSelect = (selectedVideo: string) => {
        if (!selectedVideo) return;
        
        if (packageId) {
            setNewVideos(prev => [...prev, selectedVideo]);
        } else {
            onVideosUpload(selectedVideo);
        }
    };

    const handleRemoveVideo = (index: number) => {
        if (index < originalVideoUrls.length) {
            // Track removed videos from original array
            setRemovedVideoIndexes(prev => [...prev, index]);
        } else {
            // Remove from new videos
            setNewVideos(prev => prev.filter((_, i) => i !== index - originalVideoUrls.length));
        }
    };

    const handleSaveVideos = async () => {
        if (!packageId) return;

        setIsUploading(true);
        try {
            // Filter out removed videos and add new ones
            const updatedVideos = originalVideoUrls
                .filter((_, index) => !removedVideoIndexes.includes(index))
                .concat(newVideos);

            await dispatch(
                updateTravelPackageVideosApi({
                    packageId,
                    videos: updatedVideos,
                })
            ).unwrap();

            // Reset local state
            setNewVideos([]);
            setRemovedVideoIndexes([]);
        } catch (error) {
            console.error('Failed to update videos:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Determine which videos to display
    const displayVideos = originalVideoUrls
        ?.filter((_, index) => !removedVideoIndexes.includes(index))
        .concat(newVideos)
        .map(url => ({ awsUrl: url }));

    // Show save button when there are pending changes (new videos added or existing videos removed)
    const hasPendingChanges = newVideos.length > 0 || removedVideoIndexes.length > 0;


    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Gallery Videos
            </Typography>
            <Grid container spacing={4} alignItems="center">
                {/* Upload Section */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                    
                    <ImageUploader register={handleVideoSelect} uploadFormat="BASE64" />
                </Grid>

                {/* Videos Preview Section */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                    
                    <Stack spacing={2}>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {displayVideos?.map((video, index) => (
                                video.awsUrl && (
                                    <Box key={index} position="relative">
                                        <video
                                            src={video?.awsUrl}
                                            controls
                                            preload="metadata"
                                            style={{
                                                width: 200,
                                                height: '100%',
                                                borderRadius: 8,
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                backgroundColor: 'rgba(255,255,255,0.7)',
                                            }}
                                            onClick={() => handleRemoveVideo(index)}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )
                            ))}
                        </Box>
                        {packageId && hasPendingChanges && (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSaveVideos}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Saving...' : 'Save Gallery Videos'}
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GalleryVideosDisplay;