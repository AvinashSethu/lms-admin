"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import FileUpload from "@/src/components/FileUpload/FileUpload";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, PlayCircle } from "@mui/icons-material";
import { Button, DialogContent, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursebankId() {
  const { bankID } = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [bank, setBank] = useState({});
  const [isDialogFileOpen, setIsDialogFileOPen] = useState(false);
  const [isDialogVideoOpen, setIsDialogVideoOPen] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-bank/${bankID}`
      );
      if (data.success) {
        setBank(data.data);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        router.push(`/404`);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const dialogOpenFile = () => {
    setIsDialogFileOPen(true);
  };
  const dialogCloseFile = () => {
    setIsDialogFileOPen(false);
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
      <FileUpload isOpen={isDialogFileOpen} onClose={dialogCloseFile} />

      {/* Video Upload Dialog */}
      <DialogBox
        // isOpen={isDialogOpen.video}
        // onClose={() => toggleDialog("video")}
        title="Add Video"
        actionText="Upload"
      >
        <DialogContent>
          <Stack gap="15px">
            <StyledTextField placeholder="Enter Video title" />
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
              {/* <input type="file" accept="video/*" onChange={handleFileChange} /> */}
              <Button
                variant="text"
                // onClick={handleUpload}
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
          options={["Remove"]}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
