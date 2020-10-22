import { InferGetStaticPropsType } from "next";
import { getStaticProps } from 'components/readTable';
import TableViewer from 'components/table/tableViewer';
import { WrapperApp } from 'components/elementsIndexPage';
import TextLineToto from 'components/textLineToto';


const App = ({
  dataTable,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <WrapperApp>
      <TableViewer {...dataTable} />
      <TextLineToto/>
    </WrapperApp>
  );
};

export default App;

export { getStaticProps } from 'components/readTable';
