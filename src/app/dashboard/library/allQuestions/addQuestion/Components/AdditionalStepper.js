"use client";
import { useState, useEffect } from "react";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import { Add, DeleteForever } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";

export default function AdditionalStepper({
  questionData,
  setQuestionData,
  updateOptions,
  questionType,
}) {
  const [options, setOptions] = useState(questionData?.question?.options || []);

  useEffect(() => {
    setOptions(questionData?.question?.options || []);
  }, [questionData]);

  const handleOptionChange = (index, field, value) => {
    let updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : opt
    );
    if (questionData.question.type === "MCQ" && field === "isCorrect") {
      updatedOptions = updatedOptions.map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
        weightage: i === index ? 100 : 0,
      }));
    }

    if (questionData.question.type === "MSQ" && field === "isCorrect") {
      const hasCorrect = updatedOptions.some((opt) => opt.isCorrect);
      if (!hasCorrect) {
        alert("At least one be correctttt");
        return;
      }
    }

    // if (questionData.question.type === "FIB") {
    //   updatedOptions = updatedOptions.map((opt) => ({
    //     title: opt.title || "",
    //     weightage: opt.weightage || 0,
    //   }));
    // }
    if (questionData.question.type === "FIB" && field === "weightage") {
      updatedOptions[index].weightage = value;
    }

    setOptions(updatedOptions);
    updateOptions(updatedOptions);
    updateQuestionData(updatedOptions);
  };

  const updateQuestionData = (updatedOptions) => {
    // const correctAnswers = updatedOptions.reduce((acc, opt, index) => {
    //   acc[`option${index}`] = opt.isCorrect;
    //   if (opt.weightage > 0) { 
    //     acc[`option${index}`] = true;
    //   }
    //   return acc;
    // }, 
    // {});
    let correctAnswers = {};
  
  if (questionType === "FIB") {
    correctAnswers = updatedOptions
      .filter((opt) => opt.weightage > 0)
      .map((opt) => opt.title); // Store correct answers as titles
  } else {
    correctAnswers = updatedOptions.reduce((acc, opt, index) => {
      if (opt.isCorrect) {
        acc[`option${index}`] = true;
      }
      return acc;
    }, {});
  }


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
    const newOption = { title: "", isCorrect: false, weightage: 100 };
    const updatedOptions = [...options, newOption];
    if (questionType === "FIB" && updatedOptions.length > 5) {
      alert("Maximum of 5 blanks allowed for FIB");
      return;
    }
    setOptions([...options, newOption]);
    updateOptions(updatedOptions);
    updateQuestionData([...options, newOption]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    if (questionType === "FIB" && newOptions.length === 0) {
      alert("At least one blank is required for FIB");
      return;
    }
    setOptions(newOptions);
    updateOptions(newOptions);
    updateQuestionData(newOptions);
  };

  return (
    <Stack gap="20px" width="90%">
      {questionType === "FIB"
        ? options.map((option, index) => (
            <Stack
              key={index}
              alignItems="center"
              justifyContent="center"
              sx={{
                border: "1px solid var(--border-color)",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Stack
                flexDirection="row"
                alignItems="center"
                gap="25px"
                sx={{ width: "100%" }}
              >
                <Stack>{`Blank ${index + 1}`}</Stack>

                <Stack flexDirection="row" alignItems="center" gap="10px">
                  <Typography>Weightage</Typography>
                  <TextField
                    size="small"
                    value={option.weightage}
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        "weightage",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "60px",
                    }}
                  />
                </Stack>
                <IconButton
                  onClick={() => removeOption(index)}
                  sx={{ marginLeft: "auto" }}
                >
                  <DeleteForever sx={{ color: "var(--sec-color)" }} />
                </IconButton>
              </Stack>
              <StyledTextField
                placeholder="Type here..."
                value={option.title}
                onChange={(e) =>
                  handleOptionChange(index, "title", e.target.value)
                }
              />
            </Stack>
          ))
        : options.map((option, index) => (
            <Stack key={index} alignItems="center" justifyContent="center">
              <Stack
                flexDirection="row"
                alignItems="center"
                gap="25px"
                sx={{ width: "100%" }}
              >
                <Stack>{`Option ${index + 1}`}</Stack>
                <Stack flexDirection="row" alignItems="center" gap="5px">
                  <Checkbox
                    checked={option.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(index, "isCorrect", e.target.checked)
                    }
                    sx={{
                      color: "var(--sec-color)",
                      padding: "0px",
                      "&.Mui-checked": {
                        color: "var(--sec-color)",
                      },
                    }}
                    disableRipple
                  />
                  <Typography>Correct answer</Typography>
                </Stack>
                <Stack flexDirection="row" alignItems="center" gap="10px">
                  <Typography>Weightage</Typography>
                  <TextField
                    size="small"
                    value={option.weightage}
                    onChange={(e) => {
                      const newWeightage = Number(e.target.value);

                      if (questionType === "MSQ") {
                        const totalWeight = options
                          .map((opt, i) =>
                            i === index ? newWeightage : opt.weightage
                          )
                          .reduce((sum, weight) => sum + weight, 0);

                        if (totalWeight > 100) {
                          alert(
                            "Total weightage for correct answers in MSQ cannot exceed 100"
                          );
                          return;
                        }
                      }

                      handleOptionChange(index, "weightage", newWeightage);
                    }}
                    sx={{
                      width: "60px",
                    }}
                  />
                </Stack>
                <IconButton
                  onClick={() => removeOption(index)}
                  sx={{ marginLeft: "auto" }}
                >
                  <DeleteForever sx={{ color: "var(--sec-color)" }} />
                </IconButton>
              </Stack>
              <MarkdownEditor
                questionData={questionData}
                setQuestionData={setQuestionData}
                value={option.title}
                onChange={(content) =>
                  handleOptionChange(index, "title", content)
                }
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
          {questionType === "FIB" ? "Add Blank" : " Add option"}
        </Button>
      </Stack>
    </Stack>
  );
}
