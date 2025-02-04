"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, PlayCircle } from "@mui/icons-material";
import { Button, DialogContent, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursebankId() {
  const { bankID } = useParams();
  console.log(bankID);
  const { showSnackbar } = useSnackbar();
  const menuOptions = ["Remove"];
  const [bank, setBank] = useState({});
  const [isDialogOpenFile, setIsDialogOPenFile] = useState(false);
  const [isDialogOpenVideo, setIsDialogOpenVideo] = useState(false);

  // function OnResourseAdd() {
  //   apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/course-bank/resource/create-video`,{
  //     method:"POST",
  //   }).then(())
  // }

  function fetchCourse() {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/course-bank/get-bank/${bankID}`
    ).then((data) => {
      if (data.success) {
        setBank(data.data);
        console.log(data.data);
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

  return (
    <Stack padding="20px" gap="20px">
      <Header
        // title={bank}
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
        actionText="Upload"
      >
        <DialogContent>
          <Stack gap="15px">
            <StyledTextField placeholder="Enter File title" />
            <StyledSelect title="Select File" value="one" />
          </Stack>
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
