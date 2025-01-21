"use client";
import { Button, Stack, Switch, Typography } from "@mui/material";
import { Add, CalendarMonth, East } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import GoalHead from "../components/GoalHead/GoalHead";
import { useRouter } from "next/navigation";

export default function Testseries() {
    
  const menuOptions = ["subject1", "subject2"];
  const router = useRouter();
  
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
            TMA Test series
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
            Create
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
            title= "Mock Test 1"
            options={menuOptions}
            cardWidth="100%"
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
                  router.push("/dashboard/goals/1/testseries/1")
                }}
                disableElevation
              >
                View
              </Button>
            }
            Switch={<Switch color="warning" />}
            live={
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Live
              </Typography>
            }
          />
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Mock Test 2"
            options={menuOptions}
            cardWidth="100%"
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
                  router.push("/dashboard/goals/1/testseries/2")
                }}
                disableElevation
                
              >
                View
              </Button>
            }
            Switch={<Switch color="warning" />}
            live={
              <Typography
                sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
              >
                Live
              </Typography>
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
