"use client";
import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function BasicStepper({ setQuestionData }) {
  const [level, setLevel] = useState("");
  const [questionType, setQuestionType] = useState();
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleLevel = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  const handelChange = (e) => {
    setQuestionData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchAllSubjects = () => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects/get-all-subjects`
    ).then((data) => {
      if (data.success) {
        setAllSubjects(data.data.subjects);
      } else {
        setAllSubjects([]);
      }
    });
  };

  useEffect(() => {
    fetchAllSubjects();
    setQuestionType([
      { label: "Multiple Choice (MCQ)", value: "mcq" },
      { label: "Multiple Select (MSQ)", value: "true_false" },
      { label: "Fill in the blanks", value: "short_answer" },
    ]);
  }, []);

  return (
    <Stack gap="25px">
      <StyledSelect
        title="Question type"
        options={questionType}
        getLabel={(question) => question.label}
        getValue={(question) => question.value}
        onChange={(e) => {
          setQuestionData((prev) => ({ ...prev, type: e.target.value }));
        }}
      />
      <StyledSelect
        title="Subject"
        value={selectedSubject}
        onChange={(e) => {
          setSelectedSubject(e.target.value);
          setQuestionData((prev) => ({ ...prev, subject: e.target.value }));
        }}
        options={allSubjects}
        getLabel={(subject) => subject.title}
        getValue={(subject) => subject.subjectID}
      />
      <Stack flexDirection="row" justifyContent="space-between">
        {["Easy", "Medium", "Hard"].map((index) => (
          <Button
            key={index}
            variant={level === index ? "contained" : "outlined"}
            sx={{
              width: "170px",
              textTransform: "none",
              border:
                level === index ? "none" : "1px solid var(--border-color)",
              backgroundColor:
                level === index ? "var(--primary-color)" : "transparent",
              color: level === index ? "white" : "inherit",
            }}
            onClick={() => handleLevel(index)}
            disableElevation
          >
            {index}
          </Button>
        ))}
      </Stack>
      <MarkdownEditor
        placeholder="Type Preview"
        onChange={(content) =>
          setQuestionData((prev) => ({ ...prev, content }))
        }
      />
    </Stack>
  );
}
