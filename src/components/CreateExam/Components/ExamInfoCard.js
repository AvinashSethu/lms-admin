import Image from "next/image";
import SecondaryCard from "../../SecondaryCard/SecondaryCard";
import { CalendarToday } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export default function ExamInfoCard({
  title,
  icon,
  date,
  questions,
  duration,
}) {
  return (
    <SecondaryCard
      title={title}
      icon={<Image src={icon} alt="icon" width={24} height={24} />}
      subTitle={
        <Stack flexDirection="row" gap="15px" alignItems="center">
          <CalendarToday sx={{ color: "var(--text4)", fontSize: "16px" }} />
          <Stack flexDirection="row" gap="40px" alignItems="center">
            <Typography sx={{ color: "var(--text3)", fontSize: "14px" }}>
              {date}
            </Typography>
            <Typography sx={{ color: "var(--text3)", fontSize: "14px" }}>
              {questions}
            </Typography>
            <Typography sx={{ color: "var(--text3)", fontSize: "14px" }}>
              {duration}
            </Typography>
          </Stack>
        </Stack>
      }
    />
  );
}
