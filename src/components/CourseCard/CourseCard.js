"use client";
import { Circle, TrendingFlat } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CourseCard({
  title,
  thumbnail,
  Language,
  lesson,
  hours,
  actionButton,
  progress,
  selected,
}) {
  const router = useRouter();
  return (
    <Card
      sx={{
        width: "200px",
        maxHeight: "250px",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "10px",
      }}
      elevation={0}
    >
      <Stack gap="8px">
        <Box position="relative">
          <Image
            src={thumbnail}
            alt="videoThumbnail"
            width={180}
            height={102}
          />
          {progress && (
            <CircularProgress
              variant="determinate"
              value={75}
              size={20}
              sx={{
                color: "var(--sec-color)",
                position: "absolute",
                top: "8px",
                left: "150px",
              }}
            />
          )}
        </Box>
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
        >
          {title}
        </Typography>
        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "var(--sec-color-acc-1)",
            color: "var(--sec-color)",
            width: "50px",
            fontSize: "10px",
            fontFamily: "Lato",
            textTransform: "none",
            height: "20px",
          }}
        >
          {Language}
        </Button>
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px" }}>
            {lesson}
          </Typography>
          <Circle sx={{ fontSize: "10px", color: "var(--border-color)" }} />
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px" }}>
            {hours}
          </Typography>
        </Stack>
        <Button
          variant="text"
          endIcon={
            selected ? (
              <Checkbox
                sx={{
                  color: "var(--primary-color)",
                  "&.Mui-checked": {
                    color: "var(--primary-color)",
                  },
                  "&.MuiCheckbox-root": {
                    padding: "0px",
                  },
                }}
              />
            ) : (
              <TrendingFlat />
            )
          }
          // onClick={() => {
          //   router.push("/dashboard/goals/1/courses/1");
          // }}
          sx={{
            fontFamily: "Lato",
            fontSize: "12px",
            fontWeight: "400",
            textTransform: "none",
            color: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "transparent",
            },
            padding: "0px",
          }}
          disableRipple
        >
          {actionButton}
        </Button>
      </Stack>
    </Card>
  );
}
