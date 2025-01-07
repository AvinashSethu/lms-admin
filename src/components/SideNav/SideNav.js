'use client';
import { Stack } from "@mui/material";
import Account from "./Account";
import LinkComp from "./LinkComp";
import MasterLogo from "./MasterLogo";
import OpenCloseDrawer from "./OpenCloseDrawer";
import Image from "next/image";
import { useState } from "react";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const drawer = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <Stack
        sx={{
          padding: "40px 10px 40px 30px",
          gap: "50px",
          width: isOpen ? "100px" : "300px",
          height: "100vh",
          borderRight: "1px solid var(--border-color)",
          // transition:"width .5s ease"
          position:"relative",
        }}
        
      >
        <MasterLogo isOpen={isOpen}/>
        <LinkComp isOpen={isOpen} />
        <Account isOpen={isOpen}/>
        <Image
              src="/Icons/Drawer.svg"
              alt="openclose"
              width={24}
              height={24}
              onClick={drawer}
              style={{
                position: "absolute",
                top: "11%",
                right: "-12px",
                cursor: "pointer",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                // translate: "50%",
                transition: "all .4s ease",
              }}
            />
        </Stack>
       
        {/* <OpenCloseDrawer onClick={drawer} isOpen={isOpen}/> */}
    </>
  );
}
