"use client";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function BasicStepper({ questionData, setQuestionData }) {
  const [questionType, setQuestionType] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const handleLevel = (selectedLevel) => {
    setQuestionData((prev) => ({
      ...prev,
      question: { ...prev.question, difficulty: selectedLevel.toLowerCase() },
    }));
  };

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
        );
        if (data.success) {
          setAllSubjects(data.data.subjects);
        } else {
          setAllSubjects([]);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchAllSubjects();

    setQuestionType([
      { label: "Multiple Choice (MCQ)", value: "MCQ" },
      { label: "Multiple Select (MSQ)", value: "MSQ" },
      { label: "Fill in the blanks", value: "FIB" },
    ]);
  }, []);

  return (
    <Stack gap="25px">
      <StyledSelect
        title="Question type"
        value={questionData.question.type}
        options={questionType}
        getLabel={(ques) => ques.label}
        getValue={(ques) => ques.value}
        onChange={(e) => {
          setQuestionData((prev) => ({
            ...prev,
            question: { ...prev.question, type: e.target.value },
          }));
        }}
      />
      <StyledSelect
        title="Subject"
        value={questionData.subjectID}
        onChange={(e) => {
          setQuestionData((prev) => ({ ...prev, subjectID: e.target.value }));
        }}
        options={allSubjects}
        getLabel={(sub) => sub.title}
        getValue={(sub) => sub.subjectID}
      />
      <Stack flexDirection="row" justifyContent="space-between">
        {["Easy", "Medium", "Hard"].map((level) => (
          <Button
            key={level}
            variant={
              questionData.question.difficulty === level.toLocaleLowerCase()
                ? "contained"
                : "outlined"
            }
            sx={{
              width: "170px",
              textTransform: "none",
              border:
                questionData.question.difficulty === level
                  ? "none"
                  : "1px solid var(--border-color)",
              backgroundColor:
                questionData.question.difficulty === level.toLocaleLowerCase()
                  ? "var(--primary-color)"
                  : "transparent",
              color:
                questionData.question.difficulty === level.toLocaleLowerCase()
                  ? "white"
                  : "inherit",
            }}
            onClick={() => handleLevel(level)}
            disableElevation
          >
            {level}
          </Button>
        ))}
      </Stack>
      <MarkdownEditor
        questionData={questionData}
        setQuestionData={setQuestionData}
        value={questionData.question.title}
        onChange={(content) =>
          setQuestionData((prev) => ({
            ...prev,
            question: { ...prev.question, title: content },
          }))
        }
        placeholder="Type question"
      />
    </Stack>
  );
}
