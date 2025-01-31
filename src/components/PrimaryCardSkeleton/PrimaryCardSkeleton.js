import { Button, Card, Stack, Skeleton } from "@mui/material";

export default function PrimaryCardSkeleton() {
  return (
    <Card
      sx={{
        width: "160px",
        height: "210px",
        padding: "20px 0px 20px 0px",
        borderRadius: "10px",
        // backgroundColor:"var(--text4)"
      }}
      elevation={0}
    >
      <Stack>
        <Stack alignItems="center" gap="7px">
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: "15px",
            }}
          />
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={80} />
        </Stack>
        <Button>
          <Skeleton variant="text" width={60} />
        </Button>
      </Stack>
    </Card>
  );
}
