import CourseCard from "@/src/components/CourseCard/CourseCard";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import videoThumbnail from "@/public/Images/videoThumbnail.svg";

export default function StudentCourse() {
  return (
    <Stack
      sx={{
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Courses
        </Typography>
        <Stack flexDirection="row" gap="20px">
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Add
          </Button>
        </Stack>
      </Stack>
      <Stack flexDirection="row" flexWrap="wrap" rowGap="15px" columnGap="25px" >
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
        <CourseCard
          title="General Aptitude"
          thumbnail={videoThumbnail.src}
          Language="English"
          lesson="16 Lessons"
          hours="48 Hours"
          actionButton="View"
          progress
        />
      </Stack>
    </Stack>
  );
}
