import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ loading }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 5,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;