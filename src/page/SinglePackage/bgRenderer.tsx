// bgRenderer.tsx
export const MediaBackground = ({ video }: { video: { base64Data: any } }) => {
  if (!video?.base64Data) return null;
  const videoSrc = `data:video/mp4;base64,${video.base64Data.base64Data}`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source
          src={videoSrc}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};