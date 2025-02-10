import MDPreview from "@/src/components/MarkdownPreview/MarkdownPreview";
import { Stack, Typography } from "@mui/material";

export default function PreviewStepper({ questionData }) {
  const {title, type, difficulty, options, solution} = questionData.question;
  const subjectID = questionData.subjectID || "Not specified";
  let optionsContent = "";
  if(type === "FIB") {
    optionsContent = options.map((option, index) => {
      return `${index + 1}. ${option.title}`;
    }).join("\n");
  }
  else {
    optionsContent = options.map((option, index) => {
      return `${index + 1}. ${option.title} ${option.isCorrect ? "(Correct)" : ""}`;
    }).join("\n");
  }

  return (
    <Stack sx={{ padding: "10px", width: "100%" }}>
      <Typography
        sx={{
          fontFamily: "Lato",
          fontSize: "22px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Preview
      </Typography>
      <Stack gap="15px">
      <Stack flexDirection="row" gap="20px">
        <Typography sx={{fontWeight:"700"}}>Question : </Typography>
        <MDPreview value={title} />
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <Typography sx={{fontWeight:"700"}}>Subject ID : </Typography>
        <Typography>{subjectID}</Typography>
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <Typography sx={{fontWeight:"700"}}>Type : </Typography>
        <Typography>{type}</Typography>
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <Typography sx={{fontWeight:"700"}}>Options : </Typography>
        <MDPreview value={optionsContent} />
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <Typography sx={{fontWeight:"700"}}>Solution : </Typography>
        <MDPreview value={solution} />
      </Stack>
      </Stack>
    </Stack>
  );
}
