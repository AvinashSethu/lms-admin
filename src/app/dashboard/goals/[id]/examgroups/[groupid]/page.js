"use client";
import {
  Button,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import GoalHead from "../../components/GoalHead/GoalHead";
import { Add, Info, Settings } from "@mui/icons-material";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import calendar from "@/public/Icons/weekCalendar.svg";
import { useRouter } from "next/navigation";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useState } from "react";
import StatusCard from "@/src/components/CreateExam/Components/StatusCard";
import StyledSwitchButton from "@/src/components/StyledSwitch/StyledSwitch";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";

export default function Groupid() {
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const [isSettingDialog, setIsSettingDialog] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  const settingDialogopen = () => {
    setIsSettingDialog(true);
  };
  const settingDialogClose = () => {
    setIsSettingDialog(false);
  };

  const router = useRouter();
  return (
    <Stack padding="20px" gap="15px">
      <GoalHead />
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "16px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Weekly Test
          </Typography>
          <Stack flexDirection="row" alignItems="center" gap="20px">
            <Typography sx={{ fontFamily: "Lato", fontSize: "14px" }}>
              Live
            </Typography>
            <StyledSwitchButton />
            <Settings
              sx={{ color: "var(--primary-color)", cursor: "pointer" }}
              onClick={settingDialogopen}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={dialogOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                minWidth: "120px",
              }}
              disableElevation
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <DialogBox
          isOpen={isSettingDialog}
          onClose={settingDialogClose}
          title="Group Settings"
          actionText="Save"
        >
          <DialogContent>
            <Stack gap="10px">
              <Stack gap="5px">
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--text3)",
                  }}
                >
                  Name
                </Typography>
                <StyledTextField placeholder="Enter test name" />
              </Stack>
              <Stack gap="6px">
                <Typography
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--text3)",
                  }}
                >
                  Who can access this test
                </Typography>
                <FormControl size="small">
                  <InputLabel>Select plan</InputLabel>
                  <Select label="Select plan">
                    <MenuItem value="Free">Free</MenuItem>
                    <MenuItem value="pro">Pro</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack>
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "var(--text3)",
                    }}
                  >
                    MCoin rewards
                  </Typography>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <StyledSwitchButton />
                    <Info
                      fontSize="small"
                      sx={{ color: "var(--primary-color)" }}
                    />
                  </Stack>
                </Stack>
                <Stack gap="10px">
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "var(--text3)",
                    }}
                  >
                    Select rewarding percentage
                  </Typography>
                  <Slider
                    size="small"
                    valueLabelDisplay="auto"
                    sx={{ color: "var(--primary-color)" }}
                  ></Slider>
                </Stack>
                <Stack gap="5px">
                  <Typography
                    sx={{
                      fontFamily: "Lato",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "var(--text3)",
                    }}
                  >
                    Coins to be rewarded
                  </Typography>
                  <StyledTextField placeholder="Enter coins" />
                </Stack>
              </Stack>
            </Stack>
          </DialogContent>
        </DialogBox>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Add Test"
          actionText="Add"
        >
          <DialogContent>
            <Stack>
              <StyledTextField placeholder="Enter Test" />
            </Stack>
          </DialogContent>
        </DialogBox>
        <Stack flexDirection="row" gap="30px">
          <StatusCard info title="Mcoins rewarded" count="2500" />
          <StatusCard info title="No of attempts" count="250" />
        </Stack>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          columnGap="20px"
          rowGap="15px"
          marginTop="25px"
        >
          <PrimaryCard
            icon={calendar}
            title="Monday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Tuesday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Wednesday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Thursday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Friday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Saturday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
