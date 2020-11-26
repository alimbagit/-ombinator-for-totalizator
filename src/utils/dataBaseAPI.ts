import firebase from "firebase";
import { State } from "utils/my-redux/rootReducer";
import loadDeafaultTable from "./loadDeafaultTable";

/**Сохранить состояние всей таблицы */
export const SaveTable = async (table: State) => {
  let userId = firebase.auth().currentUser?.uid;
  let result;
  if (userId) {
    result = await firebase
      .database()
      .ref("users/" + userId)
      .set({
        table: table,
      });
  }
  else result = "Вы не авторизованы!";
  return result;
};

/**Начальная загрузка таблицы из БД */
export const initialTableFromBase = async () => {
  let userId = firebase.auth().currentUser?.uid;
  let userSnapshot = await firebase
    .database()
    .ref("users/" + userId + "/table")
    .once("value");
  let tableData: State;
  if (userSnapshot.val()) {
    tableData = userSnapshot.val();
  } else {
    tableData = await loadDeafaultTable();
    SaveTable(tableData);
  }
  return tableData;
};
