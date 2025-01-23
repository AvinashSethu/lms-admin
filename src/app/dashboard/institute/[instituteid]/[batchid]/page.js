"use client";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import {
  AccountBalance,
  ArrowBackIos,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Batchid() {
  const router = useRouter();
  return (
    <Stack padding="20px" gap="20px">
      <Stack
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "var(--white)",
          minHeight: "100vh",
          gap:"20px"
        }}
      >
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack flexDirection="row" gap="5px" alignItems="center">
          <ArrowBackIos fontSize="small" sx={{cursor:"pointer"}} onClick={() => {
            router.back();
          }} />
          <Typography sx={{fontFamily:"Lato",fontSize:"20px",fontWeight:"700"}}>ECE 3rd year</Typography>
        </Stack>
        <Stack flexDirection="row" gap="20px">
          <SearchBox />
          <Button
            variant="contained"
            onClick={() => {
                router.push("/dashboard/institute/1/1/1")
            }}
            sx={{
              textTransform: "none",
              backgroundColor: "var(--primary-color)",
              width: "120px",
            }}
            disableElevation
          >
            Students
          </Button>
        </Stack>
      </Stack>
      
        <Stack columnGap="35px" rowGap="15px" flexWrap="wrap" flexDirection="row">
          <SecondaryCard
            icon={
              <AccountBalance
                sx={{ color: "var(--sec-color)" }}
                fontSize="large"
              />
            }
            title="Placements 1"
            cardWidth="500px"
            subTitle={
              <Stack flexDirection="row" gap="20px">
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  Institute
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  120 Questions
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  2024-08-05
                </Typography>
              </Stack>
            }
          />
          <SecondaryCard
            icon={
              <AccountBalance
                sx={{ color: "var(--sec-color)" }}
                fontSize="large"
              />
            }
            title="Placements 1"
            cardWidth="500px"
            subTitle={
              <Stack flexDirection="row" gap="20px">
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  Institute
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  120 Questions
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text3)",
                    fontFamily: "Lato",
                    fontSize: "12px",
                  }}
                >
                  2024-08-05
                </Typography>
              </Stack>
            }
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
