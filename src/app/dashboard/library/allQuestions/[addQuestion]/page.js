"use client";
import { useState } from "react";
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
import QuestionCard from "@/src/components/CreateExam/Components/QuestionCard";
import PreviewStepper from "./Components/PreviewStepper";

export default function AddQuestion() {
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

  const handleNext = () => {
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
            />
          )}
          {activeStep === 1 && (
            <AdditionalStepper
              questionData={questionData}
              setQuestionData={setQuestionData}
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
      {/* {submittedQuestion && <QuestionCard data={questionData} />} */}
    </Stack>
  );
}
