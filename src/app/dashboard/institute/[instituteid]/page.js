"use client";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, GroupsSharp } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Instituteid() {
    const router = useRouter();
  const menuOptions = ["Remove"];
  return (
    <Stack padding="20px" gap="20px">
      <Header
        back
        title="P.S.R Engineering College"
        search
        button="Batch"
        icon={<Add />}
        buttons="Exam"
      />
      <Stack
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "var(--white)",
          minHeight: "100vh",
        }}
      >
        <Stack gap="15px">
          <SecondaryCard
            icon={
              <GroupsSharp
                fontSize="large"
                sx={{ color: "var(--sec-color)" }}
              />
            }
            title={<span style={{cursor:"pointer"}} onClick={()=>{
                router.push("/dashboard/institute/1/1")
            }}>ECE 3rd year</span>}
            // title="ECE 3rd year"
            options={menuOptions}
          />
          <SecondaryCard
            icon={
              <GroupsSharp
                fontSize="large"
                sx={{ color: "var(--sec-color)" }}
              />
            }
            title="ECE 2rd year"
            options={menuOptions}
          />
          <SecondaryCard
            icon={
              <GroupsSharp
                fontSize="large"
                sx={{ color: "var(--sec-color)" }}
              />
            }
            title="CSE 3rd year"
            options={menuOptions}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
