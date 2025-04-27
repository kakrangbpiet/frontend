// import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default LoadingOverlay;