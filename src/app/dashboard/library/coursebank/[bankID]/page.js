"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import DeleteDialogBox from "@/src/components/DeleteDialogBox/DeleteDialogBox";
import FileUpload from "@/src/components/FileUpload/FileUpload";
import Header from "@/src/components/Header/Header";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import VideoUpload from "@/src/components/VideoUpload/VideoUpload";
import { apiFetch } from "@/src/lib/apiFetch";
import {
  Add,
  Delete,
  DriveFileRenameOutlineRounded,
  FileDownloadRounded,
  InsertDriveFile,
  PlayArrowRounded,
  PlayCircle,
} from "@mui/icons-material";
import { Button, Divider, MenuItem, Skeleton, Stack } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseBankId() {
  const { bankID } = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [bank, setBank] = useState({});
  const [resourceList, setResourceList] = useState([]);
  const [isDialogFileOpen, setIsDialogFileOPen] = useState(false);
  const [isDialogVideoOpen, setIsDialogVideoOPen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResourceID, setSelectedResourceID] = useState(null);
  const [selectedResourceName, setSelectedResourceName] = useState(null);

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
        setResourceList(data.data.resources);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        router.push(`/404`);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  const handleDelete = async (resourceID, bankID) => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/delete-resource`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resourceID, bankID }),
        }
      );
      if (data.success) {
        fetchCourse();
        showSnackbar(data.message, "success", "", "3000");
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    } catch (error) {
      console.error("Error deleting course  :", error);
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

  const dialogOpenDelete = (resourceID, resourceName) => {
    setSelectedResourceID(resourceID);
    setSelectedResourceName(resourceName);
    setIsDialogDeleteOpen(true);
  };
  const dialogCloseDelete = () => {
    setIsDialogDeleteOpen(false);
  };

  return (
    <Stack padding="20px" gap="20px">
      <Header
        title={
          bank.bankTitle ? (
            bank.bankTitle
          ) : (
            <Skeleton variant="text" animation="wave" width="100px" />
          )
        }
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
        fetchCourse={fetchCourse}
      />
      <VideoUpload
        isOpen={isDialogVideoOpen}
        onClose={dialogCloseVideo}
        bankID={bankID}
        fetchCourse={fetchCourse}
      />
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        {resourceList.length > 0 ? (
          resourceList.map((item, index) => (
            <SecondaryCard
              key={index}
              icon={
                item.type === "VIDEO" ? (
                  <PlayCircle
                    sx={{ color: "var(--sec-color)" }}
                    fontSize="large"
                  />
                ) : (
                  <InsertDriveFile
                    sx={{ color: "var(--sec-color)" }}
                    fontSize="large"
                  />
                )
              }
              title={item.name}
              options={[
                item.type === "VIDEO" ? <MenuItem
                  key="one"
                  sx={{ gap: "10px", padding: "5px 12px", fontSize: "13px" }}
                >
                  <PlayArrowRounded
                    fontSize="small"
                    sx={{ fontSize: "16px" }}
                  />
                  Play
                </MenuItem> : <MenuItem
                  key="one"
                  sx={{ gap: "10px", padding: "5px 12px", fontSize: "13px" }}
                >
                  <FileDownloadRounded
                    fontSize="small"
                    sx={{ fontSize: "16px" }}
                  />
                  Download
                </MenuItem>,
                <MenuItem
                  key="one"
                  sx={{ gap: "10px", padding: "5px 12px", fontSize: "13px" }}
                >
                  <DriveFileRenameOutlineRounded sx={{ fontSize: "15px" }} />
                  Rename
                </MenuItem>,
                <Divider key="2" />,
                <MenuItem
                  key="two"
                  onClick={() => {
                    dialogOpenDelete(item.resourceID, item.name);
                  }}
                  sx={{
                    gap: "10px",
                    color: "var(--delete-color)",
                    padding: "5px 12px",
                    fontSize: "13px",
                  }}
                  name={item.name}
                  disableRipple
                >
                  <Delete fontSize="small" sx={{ fontSize: "16px" }} /> Delete
                </MenuItem>,
              ]}
              cardWidth="350px"
            />
          ))
        ) : (
          <NoDataFound info="No Resources are created yet" />
        )}
        <DeleteDialogBox
          isOpen={isDialogDeleteOpen}
          onClose={dialogCloseDelete}
          name={selectedResourceName}
          actionButton={
            <Stack
              flexDirection="row"
              justifyContent="center"
              sx={{ gap: "20px", width: "100%" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  handleDelete(selectedResourceID, bankID);
                  dialogCloseDelete();
                }}
                sx={{
                  textTransform: "none",
                  backgroundColor: "var(--delete-color)",
                  borderRadius: "5px",
                  width: "130px",
                }}
                disableElevation
              >
                Delete
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  color: "var(--text2)",
                  border: "1px solid var(--border-color)",
                  width: "130px",
                }}
                onClick={dialogCloseDelete}
                disableElevation
              >
                Cancel
              </Button>
            </Stack>
          }
        />
      </Stack>
    </Stack>
  );
}
