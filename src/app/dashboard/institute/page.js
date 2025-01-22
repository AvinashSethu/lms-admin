"use client";
import { Stack } from "@mui/material";
import Header from "@/src/components/Header/Header";
import { AccountBalance, Add } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Institute",
// };
export default function Institute() {
  const router = useRouter();
  const menuItem = ["one"];
  return (
    <Stack gap="20px" padding="20px">
      <Header
        title="Institute"
        button="Institute"
        icon={<Add />}
        search="Search"
      />
      <Stack flexWrap="wrap" flexDirection="row" rowGap="10px" columnGap="40px">
        <SecondaryCard
          title="P.S.R Engineering College"
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
