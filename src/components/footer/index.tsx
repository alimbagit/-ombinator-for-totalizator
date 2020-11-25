import React, { useState, useRef } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { State } from "utils/my-redux/rootReducer";
import loadDeafaultTable, {
  variantsCount,
  matchesCount,
} from "utils/loadDeafaultTable";
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
import CustomHits from "./customHits";
import { useDispatch, useSelector } from "react-redux";
import { setInitialValues } from "utils/my-redux/actions";
import { SaveTable } from "utils/dataBaseAPI";

/**Преобразовывает варианты ставок в текст и отоброжает его */
const Footer = () => {
  /**Значение текстового поля с форматом ставки */
  const [textValue, setTextValue] = useState("");
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [isVisibleAuthWindow, setIsVisibleAuthWindow] = useState(false);
  const [isVisibleRefactorWindow, setIsVisibleRefactorWindow] = useState(false);
  const [isVisibleResetTable, setIsVisibleResetTable] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();

  /**Варианты ставок */
  const betVariants: string[][] = useSelector(
    (state: State) => state.betVariants
  );
  /**Приоритеты исходов */
  const scoresPriorities: string[][] = useSelector(
    (state: State) => state.scoresPriorities
  );
  /**Состояние всей таблицы */
  const stateTable: State = useSelector((state: State) => state);

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

  /**Сохранение таблицы  */
  const changeSaveTable = () => {
    handleCloseMenu();

    if (firebase.auth().currentUser) {
      SaveTable(stateTable);
    } else {
      setIsVisibleAuthWindow(true);
    }
  };

  /**Предупреждение о сбросе таблицы */
  const ResetTableStartWarning = () => {
    handleCloseMenu();
    setIsVisibleResetTable(true);
  };

  /**Сброс таблицы в начальное состояние */
  const ResetTable = () => {
    setIsVisibleResetTable(false);
    loadDeafaultTable().then((data) => {
      dispatch(setInitialValues(data));
      firebase.auth().currentUser && SaveTable(data);
    });
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
    setIsVisibleResetTable(false);
  };

  return (
    <>
      {scoresPriorities.length > 0 && (
        <FooterWrapper>
          <CustomHits />
          <ButtonsWrapper>
            <Button onClick={toTextFormat} variant="outlined" style={{margin:"0 10px 5px 0"}}>
              Сформировать
            </Button>
            <Button variant="outlined" onClick={copyTextFormat} style={{margin:"0 10px 5px 0"}}>
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
                <MenuItem onClick={changeSaveTable}>Сохранить</MenuItem>
                <MenuItem onClick={changeTableSize}>Размеры таблицы</MenuItem>
                <MenuItem onClick={ResetTableStartWarning}>
                  Сбросить таблицу
                </MenuItem>
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
            headText="Авторизуйтесь чтобы пользовться этой функцией"
            children={<Auth />}
          />
          <ModalWindow
            shown={isVisibleRefactorWindow}
            closeWindow={CloseModalWindow}
            headText="Редактор размеров таблицы"
            descriptionText="Эта функция еще недоступна"
            // children={<RefactorTable />}
          />
          <ModalWindow
            shown={isVisibleResetTable}
            closeWindow={CloseModalWindow}
            headText="Вы уверены что хотите сбросить значения таблицы?"
            actionOk={ResetTable}
          />
        </FooterWrapper>
      )}
    </>
  );
};

export default Footer;
