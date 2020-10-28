import React from "react";
import { TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "my-redux/rootReducer";
/**Преобразовывает варианты ставок в текст и отоброжает его */
const TextTotoViewer = () => {
  const [value, setValue] = React.useState("");
  const betVariants = useSelector<string[][]>((state: State) => state.betVariants);
  /**Функция преобразования массива ставок в текстовый формат */
  const toTextFormat = () => {
    
  };

  return <TextField value={value} />;
};

export default TextTotoViewer;
