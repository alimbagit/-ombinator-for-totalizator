import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

interface PropsModalWIndow {
  shown: boolean;
  closeWindow: () => void;
  headText?: string;
  descriptionText?: string;
  children?: JSX.Element;
}

/**
 * Модальное окно
 *
 * @param shown - Флаг отображения модального окна
 * @param shown - состояние видимости окна
 * @param headText - заглавный текст в окне
 * @param closeWindow - callback функция, которая будет запускаться при событии закрытия модального окна
 */
const ModalWindow = ({
  shown,
  headText,
  descriptionText,
  children,
  closeWindow,
}: PropsModalWIndow) => {
  return (
    <Dialog open={shown} onClose={closeWindow}>
        {headText && <DialogTitle>{headText}</DialogTitle>}
        {descriptionText && (
          <DialogContentText>{descriptionText}</DialogContentText>
        )}
        {children && <DialogContent>{children}</DialogContent>}
        <DialogActions>
          <Button onClick={closeWindow}>OK</Button>
        </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
