import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Basic({ course }) {
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    language: "",
  });

  useEffect(() => {
    if (videoData) {
      setVideoData({
        title: videoData.title || "",
        description: videoData.description || "",
        thumbnail: videoData.thumbnail || "",
        language: videoData.language?.join(", ") || "",
      });
    }
  }, [videoData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.title]: e.target.value });
  };
  return (
    <Stack marginTop="20px">
      <Stack gap="18px">
        <Stack gap="8px">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
          >
            Course Title*
          </Typography>
          <StyledTextField
            placeholder="Enter the title of your course"
            value={videoData.title}
            onChange={handleChange}
          />
        </Stack>
        <Stack gap="8px">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
          >
            Course Description*
          </Typography>
          <StyledTextField
            placeholder="Enter the full description of your course"
            id="outlined-multiline-static"
            multiline
            rows={3}
            description
          />
        </Stack>
        <Stack gap="8px">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
          >
            Thumbnail
          </Typography>
          <StyledTextField placeholder="Upload Thumbnail for course (1920 X 1080)" />
        </Stack>
        <Stack gap="8px">
          <Typography
            sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
          >
            Language
          </Typography>
          <StyledTextField placeholder="Enter the language of the video" />
        </Stack>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "var(--primary-color)",
            width: "110px",
          }}
          disableElevation
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
