"use client";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import CourseCard from "@/src/components/CourseCard/CourseCard";
import { Add, Close, Delete, East, InsertDriveFile } from "@mui/icons-material";
import {
  Button,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import videoThumbnail from "@/public/Images/videoThumbnail.svg";
import { useEffect, useState } from "react";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useParams, useRouter } from "next/navigation";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import SecondaryCardSkeleton from "@/src/components/SecondaryCardSkeleton/SecondaryCardSkeleton";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";

export default function Syllabus({ goal, fetchGoal }) {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { showSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [videoDialog, setVideoDialog] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState([]);

  const fetchAllSubjects = () => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
    )
      .then((data) => {
        if (data.success) {
          setAllSubjects(data.data.subjects);
        } else {
          setAllSubjects([]);
        }
      })
      .catch(() => {
        showSnackbar("Failed", "error", "", "3000");
      });
  };

  const fetchCourses = () => {
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseID: courses.courseID, goalID: goal.goalID }),
    }).then((data) => {
      console.log(data);
      if (data.success) {
        setCourses(data.data);
        fetchGoal();
      } else {
        setCourses([]);
      }
    });
  };

  useEffect(() => {
    fetchAllSubjects();
    fetchGoal();
    fetchCourses();
  }, []);

  const onAddSubjectSyllabus = () => {
    if (!selectedSubject) {
      showSnackbar("Select subject", "error", "", "3000");
      return;
    }

    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/add-subject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goalID: goal.goalID,
        subjectID: selectedSubject.subjectID,
      }),
    }).then((json) => {
      if (json.success) {
        showSnackbar(json.message, "success", "", "3000");
        fetchCourses();
        setIsDialogOPen(false);
      } else {
        showSnackbar(json.message, "error", "", "3000");
      }
    });
  };

  const onCourseCreate = async () => {
    if (!title) {
      showSnackbar("Fill all data", "error", "", "3000");
      return;
    }
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          goalID: goal.goalID,
        }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        setVideoDialog(false);
        setTitle("");
        fetchGoal();
      } else {
        showSnackbar("Failed to create course", "error", "", "3000");
      }
    });
  };

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
          title="Add Subject"
          icon={
            <IconButton
              sx={{ borderRadius: "10px", padding: "6px" }}
              onClick={dialogClose}
            >
              <Close />
            </IconButton>
          }
          actionButton={
            <Button
              variant="text"
              endIcon={<East />}
              onClick={onAddSubjectSyllabus}
              sx={{ textTransform: "none", color: "var(--primary-color)" }}
            >
              Add Subject
            </Button>
          }
        >
          <DialogContent>
            <StyledSelect
              title="Select Subject"
              value={selectedSubject ? selectedSubject.subjectID : ""}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
              }}
              options={allSubjects}
              getOptionLabel={(subject) => subject.title}
              getOptionValue={(subject) => subject.subjectID}
            />
          </DialogContent>
        </DialogBox>
      </Stack>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        {goal.subjectList ? (
          goal.subjectList.length > 0 ? (
            goal.subjectList.map((item, index) => (
              <SecondaryCard
                key={index}
                icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
                title={item.title}
                cardWidth="350px"
                options={[
                  <MenuItem
                    key={index}
                    sx={{
                      gap: "5px",
                      padding: "5px 12px",
                      fontSize: "13px",
                      color: "red",
                    }}
                  >
                    <Delete fontSize="small" sx={{ fontSize: "16px" }} />
                    Delete
                  </MenuItem>,
                ]}
              />
            ))
          ) : (
            <Typography sx={{ color: "var(--text4)" }}>Add subjects</Typography>
          )
        ) : (
          [...Array(3)].map((_, index) => <SecondaryCardSkeleton key={index} />)
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
        title="Add Course"
        actionText="Create"
        icon={
          <IconButton
            sx={{ borderRadius: "10px", padding: "6px" }}
            onClick={videoDialogClose}
          >
            <Close />
          </IconButton>
        }
        actionButton={
          <Button
            variant="text"
            endIcon={<East />}
            sx={{ textTransform: "none", color: "var(--primary-color)" }}
            onClick={onCourseCreate}
          >
            Add Video
          </Button>
        }
      >
        <DialogContent>
          <StyledTextField
            placeholder="Enter video Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </DialogContent>
      </DialogBox>
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            thumbnail={videoThumbnail.src}
            Language="English"
            actionButton="Edit"
            lesson="16 Lessons"
            hours="48 Hours"
          />
        ))
      ) : (
        <Typography sx={{ color: "var(--text4)" }}>
          No courses available
        </Typography>
      )}
    </Stack>
  );
}
