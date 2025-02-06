"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import FileUpload from "@/src/components/FileUpload/FileUpload";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import VideoUpload from "@/src/components/VideoUpload/VideoUpload";
import { apiFetch } from "@/src/lib/apiFetch";
import { Add, PlayCircle } from "@mui/icons-material";
import { Button, Slide, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
});
export default function CourseBankId() {
  
  
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

  const dialogOpenVideo = () => {
    setIsDialogVideoOPen(true);
  };
  const dialogCloseVideo = () => {
    setIsDialogVideoOPen(false);
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
      <FileUpload
        isOpen={isDialogFileOpen}
        onClose={dialogCloseFile}
        bankID={bankID}
        TransitionComponent={Transition}
      />
      <VideoUpload
        isOpen={isDialogVideoOpen}
        onClose={dialogCloseVideo}
        bankID={bankID}
      />
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
