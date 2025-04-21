export const MediaBackground = ({ media }) => {
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
          src={media}
          type={`video/${media.split('.').pop()}`}
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
