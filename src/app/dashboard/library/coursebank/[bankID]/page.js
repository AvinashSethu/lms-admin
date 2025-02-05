"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { uploadToS3, verifyFile } from "@/src/lib/uploadFile";
import { Add, East, PlayCircle } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  DialogContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursebankId() {
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const FileSizeDisplay = sizeConverter(MAX_FILE_SIZE);
  const { bankID } = useParams();
  const { showSnackbar } = useSnackbar();
  const menuOptions = ["Remove"];
  const [bank, setBank] = useState({});
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [isDialogOpenFile, setIsDialogOPenFile] = useState(false);
  const [isDialogOpenVideo, setIsDialogOpenVideo] = useState(false);
  const [isFileSizeExceed, setIsFileSizeExceed] = useState(false);

  function sizeConverter(bytes) {
    return (bytes / 1024).toFixed();
  }

  function fetchCourse() {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-bank/${bankID}`
    ).then((data) => {
      if (data.success) {
        setBank(data.data);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        router.push(`/404`);
      }
    });
  }

  useEffect(() => {
    fetchCourse();
  }, []);

  const dialogOpenFile = () => {
    setIsDialogOPenFile(true);
  };
  const dialogCloseFile = () => {
    setIsDialogOPenFile(false);
  };

  const dialogOpenVideo = () => {
    setIsDialogOpenVideo(true);
  };
  const dialogCloseVideo = () => {
    setIsDialogOpenVideo(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setIsFileSizeExceed(true);
        setResponseMessage(
          `File size is exceeded.. maximum size is  ${FileSizeDisplay} KB `
        );
        setFile(null);
      } else {
        setIsFileSizeExceed(false);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setResponseMessage("File is uploading");
    setProgress(0);

    const success = await uploadToS3(file, setProgress, setResponseMessage);
    if (success) {
      const verification = await verifyFile(file);
      setResponseMessage(verification);
    }
    setUploading(false);
  };

  return (
    <Stack padding="20px" gap="20px">
      <Header
        title={bank.bankTitle}
        search
        button={[
          <Button
            key="Add"
            variant="contained"
            startIcon={<Add />}
            onClick={dialogOpenFile}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            File
          </Button>,
          <Button
            key="file"
            variant="contained"
            startIcon={<Add />}
            onClick={dialogOpenVideo}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Video
          </Button>,
        ]}
        back
      />
      <DialogBox
        isOpen={isDialogOpenFile}
        onClose={dialogCloseFile}
        title="Add File"
        actionButton={
          <Button
            variant="text"
            endIcon={<East />}
            onClick={handleUpload}
            sx={{
              textTransform: "none",
              color: "var(--primary-color)",
              fontFamily: "Lato",
              fontSize: "14px",
            }}
            disabled={isFileSizeExceed || uploading}
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
              sx={{
                width: "100%",
                height: "40px",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
              }}
            >
              <input type="file" onChange={handleFileChange} />
            </Stack>
            {isFileSizeExceed && (
              <Typography color="error" sx={{ fontSize: "12px" }}>
                {responseMessage}
              </Typography>
            )}
            {uploading && (
              <Stack>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ "& .MuiLinearProgress-colorPrimary": {} }}
                />
                <Typography>{`Uploading: ${progress}%`}</Typography>
              </Stack>
            )}
          </Stack>
          <Backdrop
        open={uploading}
        sx={{
          color: "var(--border-color)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {/* <CircularProgress /> */}
      </Backdrop>
        </DialogContent>
      </DialogBox>
      
      <DialogBox
        isOpen={isDialogOpenVideo}
        onClose={dialogCloseVideo}
        title="Add Video"
        actionText="Upload"
      >
        <DialogContent>
          <Stack gap="15px">
            <StyledTextField placeholder="Enter Video title" />
            <StyledSelect title="Select video" value="one" />
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                height: "40px",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
              }}
            >
              <input type="file" onChange={handleFileChange} />
              <Button
                variant="text"
                onClick={handleUpload}
                sx={{ color: "var(--primary-color)", textTransform: "none" }}
              >
                Upload
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </DialogBox>
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        <SecondaryCard
          icon={
            <PlayCircle sx={{ color: "var(--sec-color)" }} fontSize="large" />
          }
          title="resources"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
