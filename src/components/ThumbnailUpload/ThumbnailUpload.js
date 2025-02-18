import { useSnackbar } from "@/src/app/context/SnackbarContext";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { createThumbnail, uploadThumbnailToS3 } from "@/src/lib/uploadThumbnail";

export default function ThumbnailUpload({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressVariant, setProgressVariant] = useState("indeterminate");
  const [responseMessage, setResponseMessage] = useState("No file selected");
  const thumbnailInputRef = useRef(null);

  const MAX_THUMBNAIL_SIZE_MB = 5 * 1024 * 1024; 

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > MAX_THUMBNAIL_SIZE_MB) {
        setResponseMessage("File size exceeds limit (Max: 5MB)");
        return;
      }
      setThumbnail(selectedFile);
      setResponseMessage("Thumbnail ready for upload.");
    }
  };

  const triggerFileInput = () => {
    thumbnailInputRef.current.click();
  };

  const handleThumbnailUpload = async () => {
    if (!thumbnail) {
      showSnackbar("Select a thumbnail", "error", "", "3000");
      return;
    }

    setUploading(true);
    setResponseMessage("Creating Thumbnail Entry...");

    try {
      const fileData = await createThumbnail({
        file: thumbnail,
        courseID: course.id,
        goalID: course.goalID,
      });

      setResponseMessage("Uploading Thumbnail...");

      await uploadThumbnailToS3({
        file: thumbnail,
        fileData,
        setProgress,
        setResponseMessage,
        setUploading,
        setProgressVariant,
        setCourse,
      });

    } catch (error) {
      setResponseMessage("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <Stack gap="15px">
      <input
        type="file"
        accept="image/*"
        ref={thumbnailInputRef}
        style={{ display: "none" }}
        onChange={handleThumbnailChange}
      />

      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        {thumbnail ? (
          <Typography>{thumbnail.name}</Typography>
        ) : (
          <Typography>Select Thumbnail</Typography>
        )}

        <Button
          variant="contained"
          onClick={triggerFileInput}
          sx={{ backgroundColor: "var(--primary-color)", textTransform: "none" }}
        >
          Choose File
        </Button>
      </Stack>

      {!uploading && <Typography>{responseMessage}</Typography>}

      {uploading && (
        <Stack gap={1}>
          <LinearProgress variant={progressVariant} value={progress} />
          <Typography>{responseMessage}</Typography>
        </Stack>
      )}

      <Button
        variant="contained"
        onClick={handleThumbnailUpload}
        sx={{ backgroundColor: "var(--primary-color)", textTransform: "none" }}
        disabled={!thumbnail || uploading}
      >
        Upload Thumbnail
      </Button>
    </Stack>
  );
}
