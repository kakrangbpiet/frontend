import VideoHero from "../HomePage/VideoHero";

// bgRenderer.tsx
export const MediaBackground = ({ video }: { video: any }) => {
  if (!video) return null;

  const videoSrc = `${video}`;

  return (
    <VideoHero
      videoSrc={videoSrc}
      title={"video"}
    />
  );
};