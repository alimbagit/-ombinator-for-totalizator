import { Select, MenuItem } from "@material-ui/core";
import React from "react";

interface SelectNumberProps {
  valueCell: string;
  handleChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    indexMatch: number,
    indexValue?: number
  ) => void;

  indexMatch: number;
  indexValue?: number;
}

/**
 * @param handleChange - калбэк функция, которая будет вызвана при изменении состояний в таблице
 * @param valueCell - текущее значение ячейки
 * @param indecMatch - индекс матча в таблице
 * @param indexValue - index изменяемого значния
 * @param value - значение, присваиваемое после события onChange
 */
export const SelectNumber = ({
  valueCell,
  handleChange,
  indexMatch,
  indexValue,
}: SelectNumberProps) => {
  return (
    <Select
      value={valueCell}
      onChange={(e) => {
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
