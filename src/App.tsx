import React, { useEffect } from "react";
import TableViewer from "components/table";
import { WrapperApp } from "components/elementsIndexPage";
import Footer from "components/footer";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { rootReducer } from "utils/my-redux/rootReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import initializeAppFireBase from "utils/initializeAppFirebase";

const store = createStore(rootReducer, devToolsEnhancer({}));

const App = () => {
  useEffect(() => {
    initializeAppFireBase();
  }, []);
  return (
    <ReduxProvider store={store}>
      <WrapperApp>
        <TableViewer />
        <Footer />
      </WrapperApp>
    </ReduxProvider>
  );
};

export default App;
