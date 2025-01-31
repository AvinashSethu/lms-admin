import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function StyledSelect({ title, value, onChange, options = [] }) {
  console.log(title);
  return (
    <FormControl
      sx={{
        width: "100%",
      }}
      size="small"
    >
      <InputLabel>{title}</InputLabel>
      <Select
        label={title}
        size="small"
        value={value}
        onChange={onChange}
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--sec-color)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--sec-color)",
          },
        }}
      >
        {options.length > 0 ? (
          options.map((subject) => {
            console.log(subject.title);
            return(
              <MenuItem key={subject.id} value={subject.title}>
              {subject.title}
            </MenuItem>
            )
            
          })
        ) : (
          <NoDataFound info="No data found" />
        )}
      </Select>
    </FormControl>
  );
}
