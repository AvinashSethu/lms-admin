"use client";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import { Add } from "@mui/icons-material";
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
          <DialogContent sx={{gap:"15px",display:"flex",flexDirection:"column"}}>
            <TextField
              variant="outlined"
              placeholder="Enter  name"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "5px",
                  fontFamily:"Lato",
                  fontWeight:"400",
                  fontSize:"16px",
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
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  border:"1px solid",
                  borderColor:"var(--sec-color)",
                  "&:hover":{
                    backgroundColor:"var(--sec-color-acc-1)",
                    "& path":{
                    fill:"var(--sec-color)"
                  }
                  },
                  
                }}
              >
                {/* <svg class="gateimg" width="27" height="20" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.25 17.5V30H16.875V27.5H8.75V30H0V17.5H26.25ZM20.5931 15.2219C20.2344 13.6537 19.425 12.275 18.1494 11.2213C16.9138 10.1944 15.4519 10 13.7563 9.375H13.75V5.42L14.0775 5.33187L14.7944 5.06625C15.07 4.97312 15.3194 4.895 15.5794 4.84C15.8344 4.77938 16.0112 4.75375 16.1325 4.75375C16.3681 4.75375 16.6663 4.79125 17.015 4.8675C17.37 4.95375 17.7481 5.04688 18.1325 5.1525C18.5331 5.27375 18.8906 5.36562 19.2375 5.44375C19.5681 5.51937 19.845 5.55062 20.0744 5.55062C20.4394 5.55125 20.625 5.50063 21.25 5.38938V0.863125C20.625 1.01188 20.5144 1.09375 20.0737 1.09375C19.8444 1.09375 19.5606 1.05875 19.2294 0.975C18.8837 0.90875 18.5275 0.805625 18.1269 0.689375C17.7697 0.582133 17.4083 0.489143 17.0438 0.410625C16.7044 0.33 16.4837 0.29125 16.2437 0.29125C15.4481 0.29125 14.375 0.479375 13.75 0.82625V0H12.5V9.375H12.4606C10.7781 10 9.305 10.23 8.07063 11.2569C6.81938 12.3119 6.00688 13.6012 5.6225 15.17C5.6225 15.17 4.42438 15 4.42438 16.25H21.9056C21.9056 15 20.5931 15.2219 20.5931 15.2219Z" fill="var(--sec-color-acc-1)"/>
</svg> */}

                <Image src="/Icons/gate_cse.svg" alt="title" width={17.5} height={20} fill=""/>
              </Stack>
              <Stack
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  border:"1px solid",
                  borderColor:"var(--sec-color)",
                  "&:hover":{
                    backgroundColor:"var(--sec-color-acc-1)",
                    "& path":{
                    fill:"var(--sec-color)"
                  }
                  },
                  
                }}
              >
                <Image src="/Icons/placements.svg" alt="title" width={17.5} height={20} />
              </Stack>
              <Stack
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "var(--sec-color-acc-2)",
                  borderRadius: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  border:"1px solid",
                  borderColor:"var(--sec-color)"
                }}
              >
                <Image src="/Icons/banking.svg" alt="title" width={17.5} height={20} />
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
