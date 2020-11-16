import React, { useState, useRef } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { State } from "utils/my-redux/rootReducer";
import { variantsCount, matchesCount } from "utils/loadDeafaultTable";
import {
  ButtonsWrapper,
  FooterWrapper,
  TextareaAutosize,
  Button,
  MenuWrapper,
} from "./elements";
import ModalWindow from "components/modalWindow";
import Auth from "components/auth";
import firebase from "firebase";

/**Преобразовывает варианты ставок в текст и отоброжает его */
const Footer = () => {
  /**Значение текстового поля с форматом ставки */
  const [textValue, setTextValue] = useState("");
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [isVisibleAuthWindow, setIsVisibleAuthWindow] = useState(false);
  const [isVisibleRefactorWindow, setIsVisibleRefactorWindow] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /**Варианты ставок */
  const betVariants: string[][] = useSelector(
    (state: State) => state.betVariants
  );
  /**Приоритеты исходов */
  const scoresPriorities: string[][] = useSelector(
    (state: State) => state.scoresPriorities
  );

  /**Функция преобразования массива ставок в текстовый формат */
  const toTextFormat = () => {
    let text: string = "";
    for (let col = 0; col < variantsCount; col++) {
      text += "50";
      for (let row = 0; row < matchesCount; row++) {
        text +=
          ";" +
          (row + 1).toString() +
          "-(" +
          scoresPriorities[row][parseInt(betVariants[row][col])] +
          ")";
      }
      text += ".\n";
    }
    setTextValue(text);
  };

  /**Копирование сформированного текста в буфер обмена */
  const copyTextFormat = () => {
    textAreaRef.current?.select();
    document.execCommand("copy");
  };

  /**Закрытие меню */
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  /**Открытие меню */
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  /**Сброс таблицы в начальное состояние */
  const clearTable = () => {
    handleCloseMenu();
  };

  /**Изменение размеров таблицы */
  const changeTableSize = () => {
    handleCloseMenu();
    if (firebase.auth().currentUser) {
      setIsVisibleRefactorWindow(true);
    } else {
      setIsVisibleAuthWindow(true);
    }
  };

  /**Закрытие модального окна */
  const CloseModalWindow = () => {
    setIsVisibleAuthWindow(false);
    setIsVisibleRefactorWindow(false);
  };

  return (
    <FooterWrapper>
      <ButtonsWrapper>
        <Button onClick={toTextFormat} variant="outlined">
          Сформировать
        </Button>
        <Button variant="outlined" onClick={copyTextFormat}>
          Копировать
        </Button>
        <MenuWrapper>
          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>
          <Menu
            open={Boolean(openMenu)}
            anchorEl={openMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={changeTableSize}>Размеры таблицы</MenuItem>
            <MenuItem onClick={clearTable}>Сбросить таблицу</MenuItem>
          </Menu>
        </MenuWrapper>
      </ButtonsWrapper>
      <TextareaAutosize
        ref={textAreaRef}
        value={textValue}
        placeholder="Текстовый формат"
        rowsMin={3}
      />

      <ModalWindow
        shown={isVisibleAuthWindow}
        closeWindow={CloseModalWindow}
        headText="Авторизуйтесь чтобы пользоавться этой функцией"
        children={<Auth />}
      />
      <ModalWindow
        shown={isVisibleRefactorWindow}
        closeWindow={CloseModalWindow}
        headText="Редактор размеров таблицы"
        // children={<RefactorTable />}
      />
    </FooterWrapper>
  );
};

export default Footer;
