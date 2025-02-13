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
import { useState } from "react";

export default function Basic({ course, setCourse }) {
  const languageOptions = ["English", "Tamil"];

  const handleSave = (course) => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/update/basic-info`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseID: course.courseID,
          goalID: course.goalID,
          title: course.title,
          description: course.description,
          thumbnail: course.thumbnail,
          language: course.language || [],
        }),
      }
    ).then((data) => {
      if (data) {
        console.log(course.title);
        console.log(data.message);
        // setCourse(data);
      } else {
        console.log(data.message);
      }
    });
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
            <MarkdownEditor />
          </Stack>
          <Stack width="100%" gap="30px">
            <Stack gap="8px">
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Thumbnail
              </Typography>
              <StyledTextField placeholder="Upload Thumbnail for course (1920 X 1080)" />
              {/* <input type="file" /> */}
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
                options={languageOptions}
                value={course.language || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select the language of the video"
                  />
                )}
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
          onClick={() => {
            handleSave(course);
          }}
          disableElevation
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
