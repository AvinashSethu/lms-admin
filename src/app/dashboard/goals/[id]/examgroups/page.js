"use client";
import { Button, Stack, Switch, Typography } from "@mui/material";
import { Add, CalendarMonth, East } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import GoalHead from "../components/GoalHead/GoalHead";
import { useRouter } from "next/navigation";

export default function Examgroups() {
  const router = useRouter();
  const menuOptions = ["subject1", "subject2"];
  return (
    <Stack padding="20px" gap="15px">
      <GoalHead />
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "16px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Exam Groups
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            create
          </Button>
        </Stack>
        <Stack
          flexWrap="wrap"
          flexDirection="row"
          rowGap="20px"
          columnGap="50px"
        >
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title= "Weekly Test"
            options={menuOptions}
            cardWidth="100%"
            subTitle="05/01/25 to 06/02/25"
            button={
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "var(--sec-color)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
                endIcon={<East />}
                onClick={() => {
                  router.push("/dashboard/goals/1/examgroups/1")
              }}
                disableElevation
              >
                View
              </Button>
            }
            
          />
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Monthly Test"
            button={
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "var(--sec-color)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
                endIcon={<East />}
                disableElevation
              >
                View
              </Button>
            }
            cardWidth="100%"
            options={menuOptions}
            subTitle="05/01/25 to 06/02/25"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
