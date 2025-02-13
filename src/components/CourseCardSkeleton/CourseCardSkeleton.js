import { Skeleton, Stack } from "@mui/material";

export default function CourseCardSkeleton() {
  return (
    <Stack
      alignItems="center"
      sx={{
        minWidth: "200px",
        minHeight: "230px",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          height: "100px",
          borderRadius: "10px",
          bgcolor: "var(--sec-color-acc-1)",
        }}
      />
      <Skeleton variant="text" sx={{ width: "100%" }} />
      <Skeleton variant="text" sx={{ width: "100%" }} />
      <Skeleton variant="text" sx={{ width: "100%" }} />
      <Skeleton
        variant="rectangular"
        sx={{
          marginTop: "auto",
          width: "60px",
          bgcolor: "var(--primary-color-acc-2)",
        }}
      />
    </Stack>
  );
}
