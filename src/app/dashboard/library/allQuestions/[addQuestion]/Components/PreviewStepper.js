import { Stack, Typography } from "@mui/material";

export default function PreviewStepper({ questionData }) {
  return (
    <Stack>
      <Typography variant="h6">Preview:</Typography>
      <Typography>Type: {questionData.question.type}</Typography>
      <Typography>Subject: {questionData.subjectID}</Typography>
      <Typography>Difficulty: {questionData.question.difficulty}</Typography>
      <Typography>Question: {questionData.question.title}</Typography>
      <Typography>Solution: {questionData.question.solution}</Typography>
    </Stack>
  );
}
