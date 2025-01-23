"use client";
import CustomTabs from "@/src/components/CustomTabs/CustomTabs";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Approved from "./Approved";
import Request from "./Request";

export default function Batchid() {
  const router = useRouter();
  const tabs = [
    { label: "Approved", content: <Approved /> },
    { label: "Request", content: <Request /> },
  ];
  return (
    <Stack padding="20px" gap="20px">
      <Stack
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "var(--white)",
          minHeight: "100vh",
          gap: "20px",
        }}
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="row" gap="5px" alignItems="center">
            <ArrowBackIos
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                router.back();
              }}
            />
            <Typography
              sx={{ fontFamily: "Lato", fontSize: "20px", fontWeight: "700" }}
            >
              Students
            </Typography>
          </Stack>
          <Stack>
            <SearchBox />
          </Stack>
        </Stack>
        <CustomTabs tabs={tabs} width="208px" />
      </Stack>
    </Stack>
  );
}
