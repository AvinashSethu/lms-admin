import MDPreview from "@/src/components/MarkdownPreview/MarkdownPreview";
import { Stack } from "@mui/material";

export default function PreviewStepper({ questionData }) {
  const markdownContent = `
### Preview:
  
**Type:** ${questionData.question.type}  
**Subject:** ${questionData.subjectID}  
**Difficulty:** ${questionData.question.difficulty}  

### Question:
${questionData.question.title}

### Options:
${questionData.question.options
  .map((opt, index) => `- ${opt.title} ${opt.isCorrect ? "(Correct)" : ""}`)
  .join("\n")}

### Solution:
${questionData.question.solution || "No solution provided"}
`;

  return (
    <Stack sx={{padding:"0px", margin:"0px"}}>
      <MDPreview value={markdownContent} />
    </Stack>
  );
}
