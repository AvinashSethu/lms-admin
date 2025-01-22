import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, Folder } from "@mui/icons-material";
import { Stack } from "@mui/material";

export default function AllSubjects() {
  const menuOptions = ["Remove"];
  return (
    <Stack padding="20px" gap="20px">
      <Header title="All Subjects" search button="Subject" icon={<Add />} />
      <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Numerical Ability"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Simplifications & simple equations"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
        <SecondaryCard
          icon={<Folder sx={{ color: "var(--sec-color)" }} fontSize="large" />}
          title="Blood Relations and Coding & Decoding"
          options={menuOptions}
          cardWidth="350px"
        />
      </Stack>
    </Stack>
  );
}
