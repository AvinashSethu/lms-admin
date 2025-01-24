import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, PlaylistAddCheck } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function StudentSubscription({ no_subscription }) {
  const menuOptions = ["Remove"];
  return (
    <Stack
      sx={{
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text3)",
          }}
        >
          Subscription
        </Typography>
        <Stack flexDirection="row" gap="20px">
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Add
          </Button>
        </Stack>
      </Stack>
      {no_subscription && (
        <Stack>
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "18px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            No Subscription available
          </Typography>
        </Stack>
      )}
      <Stack flexWrap="wrap" flexDirection="row" rowGap="20px" columnGap="50px">
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title={
            <Stack flexDirection="row" gap="10px">
              <Typography sx={{fontFamily:"Lato",fontSize:"16px",fontWeight:"700"}}>Monthly Subscription (1 month)</Typography>
              <Typography sx={{fontFamily:"Lato",fontSize:"16px",fontWeight:"700",color:"var(--sec-color)"}}>EXPIRED</Typography>
            </Stack>
          }
          options={menuOptions}
          cardWidth="500px"
          subTitle="₹299"
        />
        <SecondaryCard
          icon={
            <PlaylistAddCheck
              sx={{ color: "var(--sec-color)", fontSize: "30px" }}
            />
          }
          title={
            <Stack flexDirection="row" gap="10px">
              <Typography sx={{fontFamily:"Lato",fontSize:"16px",fontWeight:"700"}}>Yearly Subscription</Typography>
              <Typography sx={{fontFamily:"Lato",fontSize:"16px",fontWeight:"700",color:"var(--primary-color)"}}>ACTIVE</Typography>
            </Stack>
          }
          options={menuOptions}
          subTitle={
            <Stack flexDirection="row" gap="20px">
              <Typography fontSize="12px">₹700</Typography>
              <Typography fontSize="12px">₹700</Typography>
              <Typography fontSize="12px">₹700</Typography>
            </Stack>
          }
          cardWidth="500px"
        />
      </Stack>
    </Stack>
  );
}
