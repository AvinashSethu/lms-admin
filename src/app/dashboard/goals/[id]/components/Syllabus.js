import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import CourseCard from "@/src/components/CourseCard/CourseCard";
import { Add, InsertDriveFile } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import videoThumbnail from "@/public/Images/videoThumbnail.svg";
import { useState } from "react";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useRouter } from "next/navigation";

export default function Syllabus() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  const [videoDialog, setVideoDialog] = useState(false);
  const videoDialogOpen = () => {
    setVideoDialog(true);
  };
  const videoDialogClose = () => {
    setVideoDialog(false);
  };
  const [subjectType, setSubjectType] = useState("");
  const handleChangeSubject = (event) => {
    setSubjectType(event.target.value);
  };
  const [videoSelect, setVideoSelect] = useState("");
  const handleChangeVideo = (event) => {
    setVideoSelect(event.target.value);
  };
  const menuOptions = ["Remove"];
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Subject
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={dialogOpen}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Subject
        </Button>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Add Subject"
          actionText="Add subject"
        >
          <DialogContent>
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select Subject</InputLabel>
              <Select
                label="Select subject"
                size="small"
                value={subjectType}
                onChange={handleChangeSubject}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem value="1">one</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        </DialogBox>
      </Stack>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        <SecondaryCard
          icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
          title="Numerical Ability"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
          title="Simplifications & simple equations"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
          title="Logical reasoning"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Video courses
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={videoDialogOpen}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Video courses
        </Button>
      </Stack>
      <DialogBox
        isOpen={videoDialog}
        onClose={videoDialogClose}
        title="Add Course"
        actionText="Create"
        onClick={() => {
          videoDialogClose();
          router.push("/dashboard/goals/1/courses/1");
        }}
      >
        <DialogContent>
          <FormControl
            sx={{
              width: "100%",
            }}
            size="small"
          >
            <InputLabel>Select Subject</InputLabel>
            <Select
              label="Select subject"
              size="small"
              value={videoSelect}
              onChange={handleChangeVideo}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--sec-color)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--sec-color)",
                },
              }}
            >
              <MenuItem value="1">one</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </DialogBox>
      <CourseCard
        title="Linear Algebra"
        thumbnail={videoThumbnail.src}
        Language="English"
        actionButton="Edit"
        lesson="16 Lessons"
        hours="48 Hours"
      />
    </Stack>
  );
}
