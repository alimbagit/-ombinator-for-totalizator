import { InferGetStaticPropsType } from "next";
import { getStaticProps } from 'components/readTable';
import TableViewer from 'components/table';
import { WrapperApp } from 'components/elementsIndexPage';
import TextTotoViewer from 'components/textTotoViewer';
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { rootReducer } from "my-redux/rootReducer";
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(rootReducer, devToolsEnhancer({}));

const App = ({
  dataTable,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  return (
    <ReduxProvider store={store}>
      <WrapperApp>
        <TableViewer {...dataTable} />
        {/* <TextTotoViewer /> */}
      </WrapperApp>
    </ReduxProvider>
  );
};

export default App;

export { getStaticProps } from 'components/readTable';
