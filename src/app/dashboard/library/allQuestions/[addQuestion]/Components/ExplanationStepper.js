import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import { Stack } from "@mui/material";

export default function ExplanationStepper({ questionData, setQuestionData }) {
  return (
    <Stack>
      <MarkdownEditor
        questionData={questionData}
        setQuestionData={setQuestionData}
        value={questionData.question.solution}
        onChange={(content) =>
          setQuestionData((prev) => ({
            ...prev,
            question: { ...prev.question, solution: content }, // ✅ Update only `solution`
          }))
        }
      />
    </Stack>
  );
}
