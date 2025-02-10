import { Visibility } from "@mui/icons-material";
import { Button, Checkbox, Chip, Stack, Typography } from "@mui/material";

export default function QuestionCard({
  questionNumber,
  questionType,
  Subject,
  question,
  preview,
  check
}) {
  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{
          padding: "15px",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          height: "100px",
          width: "100%",
          gap: "15px",
          backgroundColor:"var(--white)"
        }}
      >
        {check && <Checkbox
          sx={{
            color: "var(--sec-color)",
            "&.Mui-checked": {
              color: "var(--sec-color)",
            },
            "&.MuiCheckbox-root": {
              padding: "0px",
            },
          }}
        />}
        <Stack width="100%" gap="8px">
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" alignItems="center" gap="10px">
              <Typography>{questionNumber}</Typography>
              <Button
                variant="contained"
                sx={{
                  height: "20px",
                  backgroundColor: "var(--sec-color-acc-1)",
                  color: "var(--sec-color)",
                  fontSize: "10px",
                  fontFamily: "Lato",
                  fontWeight: "700",
                }}
                disableElevation
              >
                {questionType}
              </Button>
              <Button
                variant="contained"
                sx={{
                  height: "20px",
                  backgroundColor: "var(--primary-color-acc-2)",
                  color: "var(--primary-color)",
                  fontSize: "10px",
                  fontFamily: "Lato",
                  fontWeight: "700",
                }}
                disableElevation
              >
                {Subject}
              </Button>
            </Stack>

            <Chip
              icon={<Visibility sx={{ fontSize: "small" }} />}
              label={preview}
              sx={{
                fontSize: "10px",
                fontFamily: "Lato",
                fontWeight: "700",
                height: "20px",
                backgroundColor: "var(--border-color)",
                color: "var(--text3)",
              }}
            />
          </Stack>
          <Typography>{question}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
