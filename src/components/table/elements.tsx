import Container from "@material-ui/core/TableContainer";
import Cell from "@material-ui/core/TableCell";
import styled from "styled-components";
import { TextField, Select, MenuItem } from "@material-ui/core";
import { useState } from "react";

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
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        indexValue
          ? handleChange(e, indexMatch, indexValue)
          : handleChange(e, indexMatch)
      }
    >
      <MenuItem value={0}>{0}</MenuItem>
      <MenuItem value={1}>{1}</MenuItem>
      <MenuItem value={2}>{2}</MenuItem>
    </Select>
  );
};

// export const TableWrapper = styled.div`
//     width:100%;
// `;

interface CellChangeProps {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexMatch: number,
    indexValue?: number
  ) => void;
  event: React.ChangeEvent<HTMLInputElement>;
  indexMatch: number;
  indexValue?: number;
}

// const CellChange = ({
//   handleChange,
//   event,
//   indexMatch,
//   indexValue,
// }: CellChangeProps) => {
//   return (
//     <TextField
//       style={{ width: "100px" }}
//       size="small"
//       variant="standard"
//       value={name}
//       onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
//         handleChange(event, indexMatch, indexValue)
//       }
//     />
//   );
// };

// export const handleClickCell = ({
//   handleChange,
//   event,
//   indexMatch,
//   indexValue,
// }: CellChangeProps) => {
//   document.createElement(
//     <CellChange
//       event={event}
//       handleChange={handleClickCell}
//       indexMatch={indexMatch}
//       indexValue={indexValue}
//     />
//   );
//   event.currentTarget.appendChild<CellChangeProps>();
// };
