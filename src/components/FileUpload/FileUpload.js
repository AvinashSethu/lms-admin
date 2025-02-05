"use client";
import {
  Button,
  DialogContent,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import StyledTextField from "../StyledTextField/StyledTextField";
import { useState, useRef } from "react";
import DialogBox from "../DialogBox/DialogBox";
import { Close, East } from "@mui/icons-material";
import { createFile, uploadToS3 } from "@/src/lib/uploadFile";

export default function FileUpload({ isOpen, onClose, bankID }) {
  const MAX_FILE_SIZE = 100 * 1024 * 1024;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isFileSizeExceed, setIsFileSizeExceed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [progressVarient, setProgressVarient] = useState("indeterminate");
  const [dialog, setDialog] = useState(true);
  const closeDialog = () => {
    setDialog(false);
  }

  const sizeConverter = (bytes) => (bytes / 1024).toFixed();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setIsFileSizeExceed(true);
        setResponseMessage(
          `File size exceeded. Max size is ${
            sizeConverter(MAX_FILE_SIZE) / 1024
          } MB`
        );
      } else {
        setIsFileSizeExceed(false);
        setFile(selectedFile);
        setResponseMessage("");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setResponseMessage("Creating File");

    try {
      const fileData = await createFile({ file, bankID });
      setResponseMessage("Preparing for upload");
      await uploadToS3(
        file,
        setProgress,
        setResponseMessage,
        fileData,
        setUploading,
        setProgressVarient,
        onClose
      );
    
    } catch (error) {
      setResponseMessage("Upload failed. Please try again.");
      setUploading(false);
      
    }
  };

  return (
    <DialogBox
      isOpen={isOpen}
      icon={
        <IconButton
          onClick={onClose}
          sx={{ borderRadius: "10px", padding: "6px" }}
          disabled={uploading}
        >
          <Close />
        </IconButton>
      }
      title="Add File"
      actionButton={
        <Button
          variant="text"
          endIcon={<East />}
          onClick={handleUpload}
          sx={{ textTransform: "none", color: "var(--primary-color)" }}
          disabled={isFileSizeExceed || uploading || !file}
        >
          Upload
        </Button>
      }
    >
      <DialogContent>
        <Stack gap="15px">
          <StyledTextField placeholder="Enter File title" />
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
              height: "40px",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              padding: "8px",
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ visibility: "hidden", position: "absolute" }}
            />
            {file ? <Typography>{file.name}</Typography> : <Typography>Select File</Typography>}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                height: "30px",
                textTransform: "none",
                marginLeft:"auto"
              }}
              onClick={triggerFileInput}
            >
              Choose File
            </Button>
            
          </Stack>
          {isFileSizeExceed && (
            <Typography color="error" sx={{ fontSize: "12px" }}>
              {responseMessage}
            </Typography>
          )}
          {uploading && (
            <Stack>
              <LinearProgress
                variant={progressVarient}
                value={progress}
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--sec-color)",
                  },
                  backgroundColor: "var(--sec-color-acc-2)",
                }}
              />
              <Typography>{responseMessage}</Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </DialogBox>
  );
}
