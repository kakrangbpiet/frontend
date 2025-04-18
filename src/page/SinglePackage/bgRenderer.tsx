export const MediaBackground = ({ media }) => {
    // Check if media is a video (by extension or base64 video)
    const isVideo = 
      typeof media === 'string' && 
      (media.startsWith('data:video') || 
       media.endsWith('.mp4') || 
       media.endsWith('.webm') || 
       media.endsWith('.mov'));
  
    return (
      <div className="absolute inset-0 overflow-hidden">
        {isVideo ? (
          // Video background
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src={media} 
              type={
                media.startsWith('data:video') 
                  ? media.split(';')[0].replace('data:', '') 
                  : `video/${media.split('.').pop()}`
              } 
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Image background (handles both base64 and regular URLs)
          <div 
            className="w-full h-full bg-center bg-cover"
            style={{ 
              backgroundImage: `url(data:image/jpeg;base64,${media})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>
    );
  };
  