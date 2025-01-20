"use client";
import { Stack } from "@mui/material";
import Account from "./Account";
import LinkComp from "./LinkComp";
import MasterLogo from "./MasterLogo";
import Image from "next/image";
import { useState } from "react";
import drawer_img from "@/public/Icons/Drawer.svg";

export default function SideNav() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  const drawer = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  return (
    <Stack
      bgcolor="var(--white)"
      sx={{
        borderRight: "1px solid var(--border-color)",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          width: isSideNavOpen ? "100px" : "300px",
          height: "100vh",
          transition: "width .5s ease",
          position: "relative",
        }}
      >
        <Stack
          position="fixed" 
          gap="50px"
          height="100vh"
          padding="40px 10px 40px 30px"
          sx={{ "& > :last-child": { marginTop: "auto" } }}
        >
          <MasterLogo isSideNavOpen={isSideNavOpen} />
          <LinkComp isSideNavOpen={isSideNavOpen} />
          <Account isSideNavOpen={isSideNavOpen} />
        </Stack>
      </Stack>

      <Image
        src={drawer_img.src}
        alt="openclose"
        width={24}
        height={24}
        onClick={drawer}
        style={{
          position: "fixed", 
          top: "70px",
          left: isSideNavOpen ? "90px" : "290px", 
          cursor: "pointer",
          transform: isSideNavOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all .4s ease",
        }}
      />
    </Stack>
  );
}
