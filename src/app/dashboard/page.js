"use client";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add, East } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Header/Header";
import GoalDialogBox from "./goals/[id]/components/GoalDialogBox/GoalDialogBox";
import { apiFetch } from "@/src/lib/apiFetch";
import PrimaryCardSkeleton from "@/src/components/PrimaryCardSkeleton/PrimaryCardSkeleton";

export default function Home() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goalList, setGoalList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/get-all-goals`)
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setGoalList(data.data.goals);
        } else {
          setGoalList([]);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const dialogOpen = () => {
    setIsDialogOpen(true);
  };

  const dialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Stack padding="20px" gap="15px">
      <Header
        title="Goals"
        button={[
          <Button
            key="goal"
            variant="contained"
            onClick={dialogOpen}
            startIcon={<Add />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}  
            disableElevation
          >
            Goal
          </Button>,
        ]}
      />
      <Stack flexDirection="row" justifyContent="space-between">
        <GoalDialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          actionButton={
            <Button variant="text" endIcon={<East />} sx={{textTransform:"none",color:"var(--primary-color)"}}>
              Create
            </Button>
          }
        />
      </Stack>
      <Stack flexDirection="row" gap="20px" flexWrap="wrap">
        {goalList.length > 0
          ? goalList.map((item, index) => (
              <PrimaryCard
                key={index}
                icon={`/Icons/gate_cse.svg`}
                title={item.title}
                actionButton="View"
                onClick={() => {
                  router.push(`dashboard/goals/${item.goalID}`);
                }}
              />
            ))
          : [...Array(4)].map((_, index) => (
              <PrimaryCardSkeleton key={index} />
            ))}
      </Stack>
    </Stack>
  );
}
