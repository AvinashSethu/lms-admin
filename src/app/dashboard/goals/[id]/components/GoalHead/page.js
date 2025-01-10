"use client";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import gate_cse from "@/public/Icons/gate_cse.svg";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function GoalHead() {
  const router = useRouter();
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
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap="15px">
        <ArrowBackIosNew
          onClick={() => {
            router.back();
          }}
          sx={{ color: "var(--sec-color)",fontSize:"16px" }}
        />
        <Stack
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "var(--sec-color-acc-1)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={gate_cse.src} alt="icon" width="16" height="17" />
        </Stack>
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "14px", fontWeight: "700" }}
        >
          GATE CSE
        </Typography>
      </Stack>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          width: "120px",
          backgroundColor: "var(--sec-color)",
          fontFamily: "Lato",
          fontSize: "14px",
          fontWeight: "700",
        }}
        disableElevation
      >
        Publish
      </Button>
    </Stack>
  );
}
