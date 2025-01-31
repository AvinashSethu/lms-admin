import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import CourseCard from "@/src/components/CourseCard/CourseCard";
import { Add, InsertDriveFile } from "@mui/icons-material";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import videoThumbnail from "@/public/Images/videoThumbnail.svg";
import { useEffect, useState } from "react";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useRouter } from "next/navigation";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { useSnackbar } from "@/src/app/context/SnackbarContext";

export default function Syllabus() {
  const router = useRouter();
  const menuOptions = ["Remove"];
  const { showSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [videoDialog, setVideoDialog] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubject = () => {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/add-subject`)
      .then((data) => {
        if (data.success) {
          setSubjectList(data.data.subjects);
        } else {
          setSubjectList([]);
        }
      })
      .catch(() => {
        showSnackbar(data.message, "error", "", "3000");
      });
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  function onSubjectAdd() {
    if (!selectedSubject) {
      showSnackbar("select a subject", "error", "", "3000");
      return;
    }

    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
    ).then((data) => {
      if (data.success) {
        showSnackbar("Subject added to syllabus", "success");
        fetchSubject();
      } else {
        showSnackbar("Failed to add subject", "error");
      }
    });
  }

  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };

  const videoDialogOpen = () => {
    setVideoDialog(true);
  };
  const videoDialogClose = () => {
    setVideoDialog(false);
  };

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
            <StyledSelect
              title="Select Subject"
              value={selectedSubject}
              // onClick={}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
              }}
              options={onSubjectAdd}
            />
          </DialogContent>
        </DialogBox>
      </Stack>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        {subjectList.length > 0 ? (
          subjectList.map((item, index) => (
            <SecondaryCard
              icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
              title={item.title}
              options={menuOptions}
              cardWidth="350px"
              key={index}
            />
          ))
        ) : (
          <Typography sx={{ color: "var(--text4)" }}>Add subjects</Typography>
        )}
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
          <StyledSelect title="Select Video" value="course" />
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
