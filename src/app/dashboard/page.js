"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
import gatecse_img from "@/public/Icons/gate_cse.svg";
import placements_img from "@/public/Icons/placements.svg";
import banking_img from "@/public/Icons/banking.svg";

import {
  Button,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

// const metadata = {
//   title: "Home",
// };
export default function Home() {
  const [isDialogOpen, setIsDialogOPen] = useState(false);
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
            <TextField
              variant="outlined"
              placeholder="Enter  name"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "5px",
                  fontFamily: "Lato",
                  fontWeight: "400",
                  fontSize: "16px",
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--sec-color)",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--sec-color)",
                  },
                },
              }}
            ></TextField>
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
                  backgroundColor: "var(--sec-color)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  mask:`url(${gatecse_img.src}) no-repeat center`,
                  "& img": {
                      filter:
                        "invert(29%) sepia(99%) saturate(723%) hue-rotate(336deg) brightness(90%) contrast(85%)",
                    },
                  "&:hover": {
                    backgroundColor: "var(--sec-color-acc-1)",
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    
                    
                  },
                }}
              >
                {/* <Image
                  src={gatecse_img.src}
                  alt="title"
                  width={17.5}
                  height={20}
                /> */}
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
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    "& path": {
                      fill: "var(--sec-color)",
                    },
                  },
                }}
              >
                <Image
                  src={placements_img.src}
                  alt="title"
                  width={17.5}
                  height={20}
                />
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
                    border: "1px solid",
                    borderColor: "var(--sec-color)",
                    "& path": {
                      fill: "var(--sec-color)",
                    },
                  },
                }}
              >
                <Image
                  src={banking_img.src}
                  alt="title"
                  width={17.5}
                  height={20}
                />
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
        />
        <PrimaryCard
          icon="/Icons/placements.svg"
          title="Placements"
          actionButton="View"
        />
        <PrimaryCard
          icon="/Icons/banking.svg"
          title="Banking"
          actionButton="View"
          subtitle
        />
      </Stack>
    </Stack>
  );
}
