import { AddAPhoto as AddAPhotoIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { convertFileToBase64 } from "../../scripts/fileConverter";

interface ImageUploaderProps {
  register: any;
  uploadFormat : "BASE64" | "File"
}

interface FilePreview {
  preview: string;
  name: string;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const { register } = props;
  const [file, setFile] = useState<FilePreview | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: async (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];
      const base64Image = await convertFileToBase64(file);
      if(props.uploadFormat== "BASE64" ){
        register(base64Image);
      }
      else {
        register(convertFileToBase64(file));
      }
      setFile({ preview: URL.createObjectURL(file), name: file.name });
    },
  });

  const preview = file ? (
    <Box key={file.name}>
      <div>
        <img
          style={{
            display: "block",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          alt={file.name}
          src={file.preview}
          width={400}
          height={400}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </Box>
  ) : null;

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
            {preview}
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