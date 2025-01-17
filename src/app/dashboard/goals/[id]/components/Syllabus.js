import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import VideoCard from "@/src/components/VideoCard/VideoCard";
import { Add, InsertDriveFile } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import videoThumbnail from "@/public/Images/videoThumbnail.svg";

export default function Syllabus() {
  const menuOptions = ["subject1", "subject2"];
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap:"20px",
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
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Subject
        </Button>
      </Stack>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px"> 
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Numerical Ability" options={menuOptions} cardWidth="350px"
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Simplifications & simple equations" options={menuOptions} cardWidth="350px"
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Blood Relations and Coding & Decoding" options={menuOptions} cardWidth="350px"
      />
      <SecondaryCard
        icon={<InsertDriveFile sx={{ color: "var(--sec-color)" }} />}
        title="Logical reasoning" options={menuOptions} cardWidth="350px"
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
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
          }}
          disableElevation
        >
          Video courses
        </Button>
      </Stack>
     <VideoCard title="Linear Algebra" thumbnail={videoThumbnail.src} Language="English" actionButton="Edit" lesson="16 Lessons" hours="48 Hours" />
    </Stack>
  );
}
