import VideoHero from "../HomePage/VideoHero";

// bgRenderer.tsx
export const MediaBackground = ({ video }: { video: any }) => {
  if (!video) return null;

  const videoSrc = `data:video/mp4;base64,${video?.base64Data}`;

  return (
    <VideoHero
      videoSrc={videoSrc}
      title={"video"}
    />
  );
};