import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "my-redux/rootReducer";
import { variantsCount, matchesCount } from "components/readTable";

/**Преобразовывает варианты ставок в текст и отоброжает его */
const TextTotoViewer = () => {
  /**Значение текстового поля с форматом ставки */
  const [textValue, setTextValue] = React.useState("");

  /**Варианты ставок */
  const betVariants: string[][] = useSelector(
    (state: State) => state.betVariants
  );
  const scoresPriorities: string[][] = useSelector(
    (state: State) => state.scoresPriorities
  );

  const addTextValue = (oneLine: string) => {
    setTextValue(textValue + oneLine);
  };

  /**Функция преобразования массива ставок в текстовый формат */
  const toTextFormat = () => {
    let text: string;
    for (let col = 0; col < variantsCount; col++) {
      text = "50";
      for (let row = 0; row < matchesCount; row++) {
        text +=
          ";" +
          (row + 1).toString() +
          "-(" +
          scoresPriorities[row][betVariants[row][col]] +
          ")";
      }
      addTextValue(text + ".");
    }
  };

  return (
    <>
      <Button onClick={toTextFormat} value="Сформировать" />
      <TextField value={textValue} multiline/>
    </>
  );
};

export default TextTotoViewer;
