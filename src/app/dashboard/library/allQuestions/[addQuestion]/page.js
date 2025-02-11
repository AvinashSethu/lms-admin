"use client";
import { useEffect, useState } from "react";
import Header from "@/src/components/Header/Header";
import { East, SaveAlt, West } from "@mui/icons-material";
import {
  Button,
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";
import BasicStepper from "./Components/BasicStepper";
import AdditionalStepper from "./Components/AdditionalStepper";
import ExplanationStepper from "./Components/ExplanationStepper";
import { apiFetch } from "@/src/lib/apiFetch";
import PreviewStepper from "./Components/PreviewStepper";
import { useRouter } from "next/navigation";

export default function AddQuestion() {
  const router = useRouter();
  const steps = ["Basic Info", "Additional Info", "Explanation", "Preview"];
  const [activeStep, setActiveStep] = useState(0);
  const [questionData, setQuestionData] = useState({
    subjectID: "",
    question: {
      title: "",
      difficulty: "",
      type: "",
      options: [{ title: "", isCorrect: false, weightage: 0 }],
      correctAnswers: {},
      solution: "",
    },
  });
  const [submittedQuestion, setSubmittedQuestion] = useState(null);
  const [required, setRequired] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(requiredFields());
  }, [questionData, activeStep]);

  const requiredFields = () => {
    let required = {};
    if (!questionData.question.title) {
      required.title = "required";
    }
    if (!questionData.question.type) {
      required.type = "required";
    }
    if (!questionData.subjectID) {
      required.subjectID = "required";
    }
    if (!questionData.question.difficulty) {
      required.difficulty = "required";
    }
    setRequired(required);
    return Object.keys(required).length === 0;
  };

  const handleNext = () => {
    if (!requiredFields()) {
      return;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  console.log(questionData);

  const handleSave = async () => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(questionData),
        }
      );

      if (data.success) {
        setSubmittedQuestion(data);
        router.push("/dashboard/library/allQuestions");
        setQuestionData({
          subjectID: "",
          question: {
            title: "",
            difficulty: "",
            type: "",
            options: [{ title: "", isCorrect: false, weightage: 0 }],
            correctAnswers: {},
            solution: "",
          },
        });
        console.log(data);
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error("Catch error");
    }
  };

  const updateOptions = (newOptions) => {
    let updateOptions = [...newOptions];
    if (questionData.question.type === "MCQ") {
      const correctCount = updateOptions.filter(
        (option) => option.isCorrect
      ).length;
      if (correctCount > 1) {
        alert("Multiple correct answers are not allowed in MCQ");
        return;
      }
      updateOptions = updateOptions.map((option, index) => ({
        ...option,
        weightage: option.isCorrect ? 100 : 0,
      }));
    }
    if (questionData.question.type === "MSQ") {
      const totalWeightage = updateOptions
        .filter((option) => option.isCorrect)
        .reduce((sum, option) => sum + option.weightage, 0);
      if (totalWeightage > 100) {
        alert("Total weightage of correct answers should not exceed 100");
        return;
      }
    }

    if (questionData.question.type === "FIB") {
      updateOptions = updateOptions.map((option) => ({
        title: option.title || "",
      }));

      if (updateOptions.length === 0) {
        updateOptions.push({ title: "", isCorrect: true, weightage: 100 });
      }
    }

    setQuestionData((prev) => ({
      ...prev,
      question: { ...prev.question, options: updateOptions },
    }));
  };

  return (
    <Stack padding="20px" gap="20px">
      <Header title="Back" back />
      <Stack width="100%" alignItems="center">
        <Stack
          alignItems="center"
          sx={{
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            backgroundColor: "var(--white)",
            minHeight: "60vh",
            width: "650px",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Stack sx={{ width: "100%" }}>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={
                <StepConnector
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderWidth: 7,
                      borderRadius: "50px",
                      margin: "0px 10px",
                      borderColor: "var(--primary-color-acc-2)",
                    },
                    "&.Mui-active .MuiStepConnector-line": {
                      borderColor: "var(--primary-color) !important",
                    },
                    "&.Mui-completed .MuiStepConnector-line": {
                      borderColor: "var(--primary-color) !important",
                    },
                  }}
                />
              }
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        color: "var(--primary-color-acc-1)",
                        width: "30px",
                        height: "30px",
                      },
                      "& .Mui-active .MuiStepIcon-root": {
                        color: "var(--primary-color)",
                      },
                      "& .Mui-completed .MuiStepIcon-root": {
                        color: "var(--primary-color)",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <hr
              style={{
                border: "1px solid var(--border-color)",
                marginTop: "25px",
              }}
            />
          </Stack>

          {activeStep === 0 && (
            <BasicStepper
              questionData={questionData}
              setQuestionData={setQuestionData}
              updateOptions={updateOptions}
            />
          )}
          {activeStep === 1 && (
            <AdditionalStepper
              questionData={questionData}
              setQuestionData={setQuestionData}
              updateOptions={updateOptions}
              questionType={questionData.question.type}
            />
          )}
          {activeStep === 2 && (
            <ExplanationStepper
              questionData={questionData}
              setQuestionData={setQuestionData}
            />
          )}
          {activeStep === 3 && (
            <PreviewStepper
              questionData={questionData}
              setQuestionData={setQuestionData}
            />
          )}
          <Stack flexDirection="row" sx={{ marginTop: "auto", gap: "20px" }}>
            {activeStep > 0 && (
              <Button
                variant="text"
                startIcon={<West />}
                onClick={handleBack}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  color: "var(--primary-color)",
                }}
              >
                Previous
              </Button>
            )}

            {activeStep < steps.length - 1 ? (
              <Button
                variant="text"
                endIcon={<East />}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  color: "var(--primary-color)",
                }}
                onClick={handleNext}
                disabled={!isValid}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<SaveAlt />}
                onClick={handleSave}
                sx={{
                  textTransform: "none",
                  width: "100px",
                  backgroundColor: "var(--primary-color)",
                }}
                disableElevation
              >
                Save
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
