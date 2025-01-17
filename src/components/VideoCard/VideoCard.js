import { Circle, TrendingFlat } from "@mui/icons-material";
import { Button, Card, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function VideoCard({ title, thumbnail, Language,lesson,hours,actionButton }) {
  return (
    <Card
      sx={{
        width: "200px",
        height: "230px",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "10px",
      }}
      elevation={0}
    >
      <Stack gap="8px">
        <Image src={thumbnail} alt="videoThumbnail" width={180} height={102} />
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
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px",  }}>{lesson}</Typography>
          <Circle sx={{ fontSize: "10px", color: "var(--border-color)" }} />
          <Typography sx={{ fontFamily: "Lato", fontSize: "12px",  }}>{hours}</Typography>
        </Stack>
        <Button
          variant="text"
          endIcon={<TrendingFlat />}
          sx={{
            fontFamily: "Lato",
            fontSize: "12px",
            fontWeight: "400",
            textTransform: "none",
            color: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "transparent",
            },
            padding:"0px"
          }}
          disableRipple
        >
          {actionButton}
        </Button>
      </Stack>
    </Card>
  );
}
