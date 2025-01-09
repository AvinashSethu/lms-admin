import Header from "@/components/Header/Header";
import SideNav from "@/components/SideNav/SideNav";
import { Stack } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Stack flexDirection="row" bgcolor="var(--sec-color-acc-2)">
      <SideNav />
      <Stack width="100%" >
        <Header />
        {children}
      </Stack>
    </Stack>
  );
}
