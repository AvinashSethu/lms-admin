import { Card, Stack, Skeleton } from "@mui/material";

export default function SecondaryCardSkeleton() {
  return (
    <Card
      sx={{
        width: "350px",
        height: "80px",
        padding: "10px",
        borderRadius: "10px",
      }}
      elevation={0}
    >
      <Stack alignItems="center" gap="7px" flexDirection="row">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "10px",
          }}
        />
        <Skeleton variant="text" width={60} />
        <Skeleton variant="rounded" width={7} sx={{ marginLeft: "auto" }} />
      </Stack>
    </Card>
  );
}
