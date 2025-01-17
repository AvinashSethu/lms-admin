import SideNav from "@/src/components/SideNav/SideNav";
import { Stack } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Stack flexDirection="row" bgcolor="var(--sec-color-acc-2)">
      <SideNav />
      <Stack width="100%" >
        {children}
      </Stack>
    </Stack>
  );
}
