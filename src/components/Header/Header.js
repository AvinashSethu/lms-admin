import {  Button, Stack, Typography } from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";

export default function Header({
  title,
  button,
  icon,
  onClick,
  search
}) {
  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        border: "1px solid",
        borderColor: "var(--border-color)",
        backgroundColor: "var(--white)",
        padding: "20px",
        borderRadius: "10px",
        height: "60px",
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap="15px">
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "20px", fontWeight: "700" }}
        >
          {title}
        </Typography>
      </Stack>
      <Stack flexDirection="row" gap="15px" alignItems="center">
        {search && <SearchBox />}
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            textTransform: "none",
            width: "120px",
            backgroundColor: "var(--primary-color)",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "5px",
          }}
          startIcon={icon ? icon : null}
          disableElevation
        >
          {button}
        </Button>
      </Stack>
    </Stack>
  );
}
