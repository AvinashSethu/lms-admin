import { Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function MasterLogo({isSideNavOpen}) {
    return (
        <>
        <Stack
        sx={{
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <Image
          src="/Images/Masters-logo.svg"
          alt="logo"
          width={60}
          height={26}
        />
        {!isSideNavOpen && (<Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "0.3px",
            color: "var(--primary-color)",
            whiteSpace:"nowrap"
          }}
        >
          {process.env.NEXT_PUBLIC_COMPANY_NAME}
        </Typography>)}
      </Stack>
      </>
    )
}