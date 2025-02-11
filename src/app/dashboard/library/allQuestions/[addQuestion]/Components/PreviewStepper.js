import MDPreview from "@/src/components/MarkdownPreview/MarkdownPreview";
import { Radio, RadioGroup, Stack, Typography } from "@mui/material";

export default function PreviewStepper({ questionData }) {
  const { title, type, difficulty, options, solution } = questionData.question;
  const subjectID = questionData.subjectID || "Not specified";
  let optionsContent = "";
  if (type === "FIB") {
    optionsContent = options
      .map((option, index) => {
        return `${index + 1}. ${option.title}`;
      })
      .join("\n");
  } else {
    optionsContent = options
      .map((option, index) => {
        return `${index + 1}. ${option.title} ${
          option.isCorrect ? "(Correct)" : ""
        }`;
      })
      .join("\n");
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
          <Typography sx={{ fontWeight: "700" }}>Question : </Typography>
          <MDPreview value={title} />
        </Stack>
        <Stack flexDirection="row" gap="20px">
          <Typography sx={{ fontWeight: "700" }}>Subject ID : </Typography>
          <Typography>{subjectID}</Typography>
        </Stack>
        <Stack flexDirection="row" gap="20px">
          <Typography sx={{ fontWeight: "700" }}>Difficulty : </Typography>
          <Typography>{difficulty}</Typography>
        </Stack>
        <Stack flexDirection="row" gap="20px">
          <Typography sx={{ fontWeight: "700" }}>Type : </Typography>
          <Typography>{type}</Typography>
        </Stack>
        <Stack gap="20px">
          <Typography sx={{ fontWeight: "700" }}>Options : </Typography>
          <Stack flexDirection="row" flexWrap="wrap" gap="20px">
            {options.map((option, index) => (
              <Stack
                key={index}
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
              >
                <Stack
                  flexDirection="row"
                  sx={{
                    border: `2px solid ${
                      option.isCorrect
                        ? "var(--primary-color)"
                        : "var(--border-color)"
                    }`,
                    borderRadius: "5px",
                    width: "280px",
                    height: "60px",
                    padding: "15px",
                    alignItems: "center",
                  }}
                >
                  <RadioGroup disableripple>
                    <Radio
                      checked={option.isCorrect}
                      sx={{
                        color: option.isCorrect
                          ? "var(--primary-color)"
                          : "var(--text4)",
                        "&.Mui-checked": {
                          color: "var(--primary-color)",
                        },
                      }}
                      disableripple
                    />
                  </RadioGroup>
                  <MDPreview value={option.title} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack flexDirection="row" gap="20px">
          <Typography sx={{ fontWeight: "700" }}>Solution : </Typography>
          <MDPreview value={solution} />
        </Stack>
      </Stack>
    </Stack>
  );
}
