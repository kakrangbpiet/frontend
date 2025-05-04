import { AddAPhoto as AddAPhotoIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { Container, Typography, Box, Paper } from "@mui/material";
import { convertFileToBase64 } from "../../scripts/fileConverter";

interface ImageUploaderProps {
  register: any;
  uploadFormat : "BASE64" | "File"
  buttonText?:string
}

export default function ImageUploader(props: ImageUploaderProps) {
  const { register, uploadFormat,  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      
      try {
        if (uploadFormat === "BASE64") {
          const base64Data = await convertFileToBase64(file);
          register(base64Data); // This will include the data:image/ or data:video/ prefix
        } else {
          register(file); // Send the File object directly
        }
   
      } catch (error) {
        console.error("Error processing file:", error);
      }
    },
  });


  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        borderRadius: 4,
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;",
      }}
    >
      {props?.buttonText}
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #eaeaea",
            height: 250,
            width: 250,
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          <Box
            {...getRootProps()}
            className= "dropzone"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#eaeaea75",
              height: 200,
              width: 200,
              cursor: "pointer",
              borderRadius: "50%",
              p: 1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <input {...getInputProps()} />
            <AddAPhotoIcon
              sx={{
                mb: 2,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Import an image
            </Typography>
          </Box>
        </Box>
        <Typography
          mt={2}
          textAlign={"center"}
          color={"text.secondary"}
          sx={{
            fontSize: 12,
          }}
        >
          Click to import or drag and drop JPEG, JPG, PNG, SVG, or GIF.
        </Typography>
      </Container>
    </Paper>
  );
}