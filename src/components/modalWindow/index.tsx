import React from "react";
import { Dialog } from "./elements";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";

interface PropsModalWIndow {
  /**Флаг отображения модального окна */
  shown: boolean;
  /** callback функция, которая будет запускаться при событии закрытия модального окна*/
  closeWindow: () => void;
  /**заглавный текст в окне */
  headText?: string;
  /** Надпись*/
  descriptionText?: string;
  /** Компонент, который будет внутри модального окна*/
  children?: JSX.Element;
  /** callback функция, которая будет запускаться при подтверждении действия */
  actionOk?: () => void;
}

/**
 * Модальное окно
 * @param shown - Флаг отображения модального окна
 * @param headText - заглавный текст в окне
 * @param closeWindow - callback функция, которая будет запускаться при событии закрытия модального окна
 * @param shown - Компонент, который будет внутри модального окна
 * @param actionOk - callback функция, которая будет запускаться при подтверждении действия
 */
const ModalWindow = ({
  shown,
  headText,
  descriptionText,
  children,
  closeWindow,
  actionOk,
}: PropsModalWIndow) => {
  return (
    <Dialog open={shown} onClose={closeWindow}>
      {headText && <DialogTitle>{headText}</DialogTitle>}
      <DialogContent>
        {descriptionText && <Typography>{descriptionText}</Typography>}
        {children && children}
      </DialogContent>
      <DialogActions>
        {actionOk ? (
          <>
            <Button variant="outlined" onClick={closeWindow}>
              ОТМЕНА
            </Button>
            <Button variant="outlined" onClick={actionOk}>
              ОК
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={closeWindow}>
            ОК
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
