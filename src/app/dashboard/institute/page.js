"use client";
import { Button, DialogContent, IconButton, Stack } from "@mui/material";
import Header from "@/src/components/Header/Header";
import { AccountBalance, Add, Close } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { useRouter } from "next/navigation";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { useState } from "react";

// export const metadata = {
//   title: "Institute",
// };
export default function Institute() {
  const router = useRouter();
  const menuItem = ["one"];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogOpen = () => {
    setIsDialogOpen(true);
  };

  const dialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Stack gap="20px" padding="20px">
      <Header
        title="Institute"
        button={[
          <Button
            key="institute"
            variant="contained"
            onClick={dialogOpen}
            startIcon={<Add />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Institute
          </Button>,
        ]}
      />
      <DialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Institute"
        actionText="Create"
        icon={
          <IconButton
            onClick={dialogClose}
            sx={{ borderRadius: "10px", padding: "6px" }}
          >
            <Close sx={{ color: "var(--text2)" }} />
          </IconButton>
        }
      >
        <DialogContent>
          <StyledTextField placeholder="Add Institute" />
        </DialogContent>
      </DialogBox>
      <Stack flexWrap="wrap" flexDirection="row" rowGap="10px" columnGap="40px">
        <SecondaryCard
          title={
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/dashboard/institute/1");
              }}
            >
              P.S.R Engineering College
            </span>
          }
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
        <SecondaryCard
          title="KPRIET"
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
        <SecondaryCard
          title="SKCET"
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
        <SecondaryCard
          title="PSREC"
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
        <SecondaryCard
          title="NEC"
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
        <SecondaryCard
          title="UIT"
          icon={<AccountBalance sx={{ color: "var(--sec-color)" }} />}
          options={menuItem}
          cardWidth="300px"
        />
      </Stack>
    </Stack>
  );
}
