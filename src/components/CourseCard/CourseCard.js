"use client";
import { Circle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

export default function CourseCard({
  title,
  thumbnail,
  Language,
  lessons,
  hours,
  actionButton,
  progress,
  course
}) {
  
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
            style={{ borderRadius: "10px" }}
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
        <Stack flexDirection="row" gap="2px" flexWrap="wrap">
          {Array.isArray(Language) &&
            Language.map((item, index) => (
              <Button
                key={index}
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
                {item}
              </Button>
            ))}
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px" }}>
          {lessons}
          </Typography>
          
          <Circle sx={{ fontSize: "10px", color: "var(--border-color)" }} />
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px" }}>
            {hours}
          </Typography>
        </Stack>
        <Stack alignItems="center" sx={{ marginTop: "auto" }}>
          {actionButton}
        </Stack>
      </Stack>
    </Card>
  );
}
