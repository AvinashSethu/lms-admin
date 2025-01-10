"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
import gatecse_img from "@/public/Icons/gate_cse.svg";
import placements_img from "@/public/Icons/placements.svg";
import banking_img from "@/public/Icons/banking.svg";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { useRouter } from "next/navigation";

// const metadata = {
//   title: "Home",
// };
export default function Home() {
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const router = useRouter();
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };

  return (
    <Stack padding="30px 30px 0px 30px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "20px",
            fontWeight: "700",
            mb: "15px",
          }}
        >
          Goals
        </Typography>
        <Button
          variant="contained"
          onClick={dialogOpen}
          sx={{
            textTransform: "none",
            width: "120px",
            height: "40px",
            backgroundColor: "var(--primary-color)",
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            borderRadius: "5px",
          }}
          startIcon={<Add />}
          disableElevation
        >
          Goal
        </Button>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Goal"
          actionText="Create goal"
        >
          <DialogContent
            sx={{ gap: "15px", display: "flex", flexDirection: "column" }}
          >
            <StyledTextField placeholder="Enter name" />
            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--text4)",
              }}
            >
              Select icon
            </Typography>
            <Stack flexDirection="row" gap={3} justifyContent="center">
              <Stack
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                  "&:focus": {
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                }}
                tabIndex={0}
              >
                <Stack
                  width="17.5px"
                  height="20px"
                  sx={{
                    mask: `url(${gatecse_img.src}) no-repeat center`,
                    "-webkit-mask": `url(${gatecse_img.src}) no-repeat center`,
                    backgroundColor: "var(--sec-color)",
                    opacity: "0.4",
                    maskSize: "contain",
                  }}
                ></Stack>
              </Stack>
              <Stack
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                  "&:focus": {
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                }}
                tabIndex={0}
              >
                <Stack
                  width="17.5px"
                  height="20px"
                  sx={{
                    mask: `url(${placements_img.src}) no-repeat center`,
                    "-webkit-mask": `url(${placements_img.src}) no-repeat center`,
                    backgroundColor: "var(--sec-color)",
                    opacity: "0.4",
                    maskSize: "contain",
                  }}
                ></Stack>
              </Stack>
              <Stack
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                  "&:focus": {
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    backgroundColor: "var(--sec-color-acc-1)",
                    "& > div": {
                      opacity: 1,
                    },
                  },
                }}
                tabIndex={0}
              >
                <Stack
                  width="17.5px"
                  height="20px"
                  sx={{
                    mask: `url(${banking_img.src}) no-repeat center`,
                    "-webkit-mask": `url(${banking_img.src}) no-repeat center`,
                    backgroundColor: "var(--sec-color)",
                    opacity: "0.4",
                    maskSize: "contain",
                  }}
                ></Stack>
              </Stack>
            </Stack>
          </DialogContent>
        </DialogBox>
      </Stack>
      <Stack flexDirection="row" gap="20px">
        <PrimaryCard
          icon="/Icons/gate_cse.svg"
          title="GATE CSE"
          actionButton="View"
          onClick={() => {
            router.push("dashboard/goals/1");
          }}
        />
        <PrimaryCard
          icon="/Icons/placements.svg"
          title="Placements"
          actionButton="View"
          onClick={() => {
            router.push("dashboard/goals/2");
          }
          }
        />
        <PrimaryCard
          icon="/Icons/banking.svg"
          title="Banking"
          actionButton="View"
          subtitle="2 months"
          onClick={() => {
            router.push("dashboard/goals/3");
          }}
        />
      </Stack>
    </Stack>
  );
}
