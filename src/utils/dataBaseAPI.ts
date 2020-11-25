import firebase from "firebase";
import { State } from "utils/my-redux/rootReducer";

// export const CreateTableNewUser = (table: any) => {
//   /**Событие ответа сервера авторизации */
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       firebase
//         .auth()
//         .currentUser?.getIdToken()
//         .then((token) => {
//           firebase
//             .database()
//             .ref("users/" + token)
//             .set({
//               table: table,
//             });
//         });
//       console.log("user=", user.displayName, user.email);
//     } else {
//       console.log("Авторизация не произошла!");
//     }
//   });
// };

/**Сохранить состояние всей таблицы */
export const SaveTable = (table: State) => {
  let userId = firebase.auth().currentUser?.uid;
  if (userId) {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        table: table,
      });
  }
};

/**Начальная загрузка таблицы из БД */
export const initialTableFromBase = async () => {
  let userId = firebase.auth().currentUser?.uid;
  let userSnapshot = await firebase
    .database()
    .ref("users/" + userId + "/table")
    .once("value");
  let tableData: State = userSnapshot.val();
  return tableData;
};
