"use client";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Header/Header";
import GoalDialogBox from "./goals/[id]/components/GoalDialogBox/GoalDialogBox";

// const metadata = {
//   title: "Home",
// };

export default function Home() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [goalList, setGoalList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/get-all-goals`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.success) {
          setGoalList(data.data.goals);
          console.log(data.data.goals);
        } else {
          setGoalList([]);
        }
      });
  }, []);

  const dialogOpen = () => {
    setIsDialogOpen(true);
  };

  const dialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Stack padding="20px" gap="15px">
        <Header
          title="Goals"
          button="Goal"
          icon={<Add />}
          onClick={dialogOpen}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <GoalDialogBox isOpen={isDialogOpen} onClose={dialogClose} />
        </Stack>
        <Stack flexDirection="row" gap="20px">
          {/* {goalList.map((item, index) => {
            return (
              <PrimaryCard
                key={index}
                icon={"/Icons/gate_cse.svg"}
                title={item[0].title}
                actionButton="View"
                onClick={() => {
                  router.push(`dashboard/goals/${item[0].goalID}`);
                }}
              />
            );
          })} */}
          {goalList.length > 0 ? (
            goalList.map((item, index) => (
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
          ) : (
            <Stack>
              <Skeleton
                variant="rectangular"
                width={160}
                height={210}
                sx={{ borderRadius: "10px", padding: "20px 0px 20px 0px" }}
              >
              </Skeleton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
