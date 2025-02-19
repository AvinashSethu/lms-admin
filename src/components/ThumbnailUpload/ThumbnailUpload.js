import { useSnackbar } from "@/src/app/context/SnackbarContext";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  createThumbnail,
  uploadThumbnailToS3,
} from "@/src/lib/uploadThumbnail";
import defaultThumbnail from "@/public/Images/defaultThumbnail.svg";
import Image from "next/image";

export default function ThumbnailUpload({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressVariant, setProgressVariant] = useState("indeterminate");
  const [responseMessage, setResponseMessage] = useState("No file selected");
  const [thumbnailPreview, setThumbnailPreview] = useState(
    course.thumbnail || defaultThumbnail
  );
  const thumbnailInputRef = useRef(null);

  const MAX_THUMBNAIL_SIZE_MB = 5 * 1024 * 1024;

  useEffect(() => {
    if (course.thumbnail) {
      setThumbnailPreview(course.thumbnail || "");
    }
  }, [course.thumbnail]);

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > MAX_THUMBNAIL_SIZE_MB) {
        setResponseMessage("File size exceeds limit (Max: 5MB)");
        return;
      }
      setThumbnail(selectedFile);
      setThumbnailPreview(URL.createObjectURL(selectedFile));
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
      setThumbnailPreview(fileData.data.url);
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
        style={{ visibility: "hidden", position: "absolute" }}
        onChange={handleThumbnailChange}
      />

      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "3px 4px 3px 5px",
        }}
      >
        {thumbnail ? (
          <Typography>{thumbnail.name}</Typography>
        ) : (
          <Typography>Select Thumbnail</Typography>
        )}

        <Button
          variant="contained"
          onClick={triggerFileInput}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
        >
          Choose File
        </Button>
      </Stack>
      {thumbnailPreview && (
        <Stack>
          <Image
            src={thumbnailPreview}
            alt="preview"
            width={200}
            height={100}
          />
        </Stack>
      )}

      {!uploading && <Typography>{responseMessage}</Typography>}

      {uploading && (
        <Stack gap={1}>
          <LinearProgress variant={progressVariant} value={progress} />
          <Typography>{responseMessage}</Typography>
        </Stack>
      )}
      <Stack flexDirection="row">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--delete-color)",
            textTransform: "none",
            width: "120px",
          }}
          disabled={!thumbnailPreview}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={handleThumbnailUpload}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
            width: "180px",
            marginLeft: "auto",
          }}
          disabled={!thumbnail || uploading}
        >
          Upload Thumbnail
        </Button>
      </Stack>
    </Stack>
  );
}
