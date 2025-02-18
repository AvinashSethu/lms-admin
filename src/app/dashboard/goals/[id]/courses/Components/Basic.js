import { useSnackbar } from "@/src/app/context/SnackbarContext";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

export default function Basic({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const thumbnailInputRef = useRef(null);
  console.log(course.lessons);
  
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadThumbnail = async () => {
    if (!thumbnail) {
      showSnackbar("Select a thumbnail", "error", "", "3000");
      return;
    }
    // const formData = new FormData();
    // formData.append("thumbnail", thumbnail);
    const fileType = thumbnail.type;
    const fileName = thumbnail.name;

    await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/create-thumb`,
      {
        method: "POST",
        body: JSON.stringify({
          courseID: course.id,
          goalID: course.goalID,
          fileType,
          fileName,
        }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        setCourse((prev) => ({ ...prev, thumbnail: url }));
      } else {
        console.log("Not upload");
      }
    });
  };

  const handleSave = async () => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/update/basic-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseID: course.id,
            goalID: course.goalID,
            title: course.title,
            description: course.description,
            thumbnail: course.thumbnail,
            language: course.language,
          }),
        }
      );
      if (data) {
        console.log(course);
        setCourse(course);
        showSnackbar(data.message, "success", "", "3000");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(data.message);
    }
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
            value={course.title}
            onChange={(e) => {
              setCourse((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </Stack>
        <Stack
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          gap="20px"
        >
          <Stack gap="8px">
            <Typography
              sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
            >
              Course Description*
            </Typography>
            <MarkdownEditor
              value={course.description}
              onChange={(val) => {
                setCourse((prev) => ({ ...prev, description: val }));
              }}
            />
          </Stack>
          <Stack width="100%" gap="30px">
            <Stack gap="8px">
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Thumbnail
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                ref={thumbnailInputRef}
                style={{ visibility: "hidden", position: "absolute" }}
              />
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                sx={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px",
                  height: "40px",
                  alignItems: "center",
                }}
              >
                {thumbnail ? (
                  <Typography sx={{ paddingLeft: "5px" }}>
                    {thumbnail.name}
                  </Typography>
                ) : (
                  <Typography sx={{ paddingLeft: "5px" }}>
                    Select an image
                  </Typography>
                )}
                <Button
                  variant="text"
                  onClick={() => thumbnailInputRef.current.click()}
                  sx={{
                    color: "var(--sec-color)",
                    textTransform: "none",
                    height: "30px",
                  }}
                  disableElevation
                >
                  Choose Thumbnail
                </Button>
              </Stack>
              <Button
                variant="contained"
                onClick={uploadThumbnail}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  textTransform: "none",
                  height: "30px",
                  width: "100px",
                  marginLeft: "auto",
                }}
                disableElevation
              >
                Upload
              </Button>
            </Stack>
            <Stack gap="8px">
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Language
              </Typography>
              <Autocomplete
                multiple
                filterSelectedOptions
                options={["English", "Tamil"]}
                value={course.language || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select the language of the video"
                  />
                )}
                onChange={(_, newValue) => {
                  setCourse((prev) => ({ ...prev, language: newValue }));
                }}
              />
            </Stack>
            <Stack gap="8px">
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Hours*
              </Typography>
              <StyledTextField
                placeholder="Enter the title of your course"
                value={course.duration}
                onChange={(e) => {
                  setCourse((prev) => ({ ...prev, duration: e.target.value }));
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "var(--primary-color)",
            width: "110px",
          }}
          onClick={handleSave}
          disableElevation
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
