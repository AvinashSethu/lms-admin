import MarkdownEditor from "@/src/components/MarkdownEditor/MarkdownEditor";
import { Stack } from "@mui/material";

export default function ExplanationStepper({ setQuestionData }) {
  return (
    <Stack>
      <MarkdownEditor
        onChange={(content) =>
          setQuestionData((prev) => ({ ...prev, question: { ...prev.question, solution: content } }))
        }
      />
    </Stack>
  );
}
