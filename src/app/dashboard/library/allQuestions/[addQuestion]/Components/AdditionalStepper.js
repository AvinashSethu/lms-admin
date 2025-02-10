"use client";
import { useState, useEffect } from "react";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { Add, DeleteForever } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import StyledSwitchButton from "@/src/components/StyledSwitch/StyledSwitch";

export default function AdditionalStepper({ questionData, setQuestionData }) {
  const [options, setOptions] = useState(questionData?.question?.options || []);

  useEffect(() => {
    setOptions(questionData?.question?.options || []);
  }, [questionData]);

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : opt
    );
    setOptions(updatedOptions);
    updateQuestionData(updatedOptions);
  };

  const updateQuestionData = (updatedOptions) => {
    const correctAnswers = updatedOptions.reduce((acc, opt, index) => {
      acc[`option${index}`] = opt.isCorrect;
      return acc;
    }, {});

    setQuestionData((prev) => ({
      ...prev,
      question: {
        ...prev.question,
        options: updatedOptions ?? [],
        correctAnswers,
      },
    }));
  };

  const addOption = () => {
    const newOption = { title: "", isCorrect: false, weightage: 0 };
    setOptions([...options, newOption]);
    updateQuestionData([...options, newOption]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateQuestionData(newOptions);
  };

  return (
    <Stack gap="20px">
      {options.map((option, index) => (
        <Stack
          key={index}
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "95%" }}
          >
            <Stack sx={{width:"100px"}}>{`Option ${index + 1}`}</Stack>
            <Checkbox
              checked={option.isCorrect}
              onChange={(e) =>
                handleOptionChange(index, "isCorrect", e.target.checked)
              }
              sx={{
                color: "var(--sec-color)",
                "&.Mui-checked": {
                  color: "var(--sec-color)",
                },
              }}
            />

            <Typography sx={{ width: "250px" }}>Correct answer</Typography>
            <Stack flexDirection="row" alignItems="center" gap="10px">
              <Typography>Weightage</Typography>
              <TextField
                size="small"
                value={option.weightage}
                onChange={(e) =>
                  handleOptionChange(index, "weightage", Number(e.target.value))
                }
                sx={{
                  width: "60px",
                  "& .MuiInputBase-root": { height: "30px" },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--sec-color)",
                      borderWidth: "1px",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--sec-color)",
                    },
                  },
                }}
              />
            </Stack>
            <IconButton onClick={() => removeOption(index)}>
              <DeleteForever sx={{ color: "var(--sec-color)" }} />
            </IconButton>
          </Stack>
          <MarkdownEditor
            questionData={questionData}
            setQuestionData={setQuestionData}
            value={option.title}
            onChange={(content) => handleOptionChange(index, "title", content)}
            placeholder="Type option"
          />
        </Stack>
      ))}
      <Stack width="100%" alignItems="center">
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={addOption}
          sx={{
            width: "150px",
            backgroundColor: "var(--sec-color)",
            textTransform: "none",
            fontSize: "16px",
          }}
          disableElevation
        >
          Add option
        </Button>
      </Stack>
    </Stack>
  );
}
