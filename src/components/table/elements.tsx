import { Select, MenuItem } from "@material-ui/core";

interface SelectNumberProps {
  valueCell: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexMatch: number,
    indexValue?: number
  ) => void;
  indexMatch: number;
  indexValue?: number;
}
export const SelectNumber = ({
  valueCell,
  handleChange,
  indexMatch,
  indexValue,
}: SelectNumberProps) => {
  return (
    <Select
      value={valueCell}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (indexValue !== undefined) {
          handleChange(e, indexMatch, indexValue);
        } else handleChange(e, indexMatch);
      }}
    >
      <MenuItem value="X">X</MenuItem>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
    </Select>
  );
};
