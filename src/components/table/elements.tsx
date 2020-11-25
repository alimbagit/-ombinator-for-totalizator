import {
  TableRow as TmpTableRow,
  TableCell as TmpTableCell,
  TableCellBaseProps,
  Select,
  MenuItem,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const TableCell = styled(TmpTableCell).attrs<TableCellBaseProps>(
  {}
)<TableCellBaseProps>`
  padding: 0px 5px 0px 5px;
`;

export const TextInput = styled.input`
  border: 0px;
  background-color: white;
  &:focus {
    border: 0px;
    outline: none;
  }
`;

export const TableRow = styled(TmpTableRow)``;

const Option = styled(MenuItem)`
  border: 0px;
  text-align: center;
`;

const MySelect = styled(Select)`
  border: 0px;
  background-color: white;
  &:focus {
    border: 0px;
    outline: none;
  }
  outline: none;
  margin-left: 10px;
`;

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
  isNeutral?: boolean;
}

/**
 * @param isNeutral - нужно ли поле "н" для селектора
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
  isNeutral,
}: SelectNumberProps) => {
  return (
    <MySelect
      value={valueCell}
      onChange={(e) => {
        if (indexValue !== undefined) {
          handleChange(e, indexMatch, indexValue);
        } else handleChange(e, indexMatch);
      }}
    >
      <Option value="X">Х</Option>
      <Option value="1">1</Option>
      <Option value="2">2</Option>
      {isNeutral && <Option value="Н">Н</Option>}
    </MySelect>
  );
};
