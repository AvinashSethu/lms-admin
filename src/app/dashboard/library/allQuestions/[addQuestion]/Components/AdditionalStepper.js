"use client";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import { Add, DeleteForever } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function AdditionalStepper({setQuestionData}) {
  const [options, setOptions ] = useState([""]);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  // Add new option
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // Remove an option
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };


  return (
    <Stack gap="20px" alignItems="center">
      <Stack sx={{ border: "1px solid var(--border-color)", width: "100%" }}>
        <Stack flexDirection="row" alignItems="center">
          <Typography paddingLeft="5px">Option 1</Typography>
          <IconButton sx={{ marginLeft: "auto" }}>
            <DeleteForever sx={{ color: "var(--sec-color)" }} />
          </IconButton>
        </Stack>
        <MarkdownEditor onChange={(content) => handleOptionChange(content)} />
      </Stack>
      <Button
        variant="contained"
        endIcon={<Add />}
        onClick={addOption}
        sx={{
          backgroundColor: "var(--sec-color)",
          textTransform: "none",
          width: "140px",
        }}
        disableElevation
      >
        Add option
      </Button>
    </Stack>
  );
}
