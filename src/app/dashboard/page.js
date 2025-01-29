"use client";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
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
        setGoalList(data);
        console.log(data);
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
          {goalList.map((item, index) => {
            return (
              <PrimaryCard
                key={index}
                icon={"/Icons/gate_cse.svg"}
                title={item.title}
                actionButton="View"
                onClick={() => {
                  router.push(`dashboard/goals/${item.pKey}`);
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}
