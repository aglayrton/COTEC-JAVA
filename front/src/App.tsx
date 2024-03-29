import { useState } from "react";
import Cabecalho from "./components/Cabecalho";
import Container from "./components/Container";
import Form from "./components/Form";
import Rodape from "./components/Rodape";
import { Tabela } from "./components/Tabela";
import Titulo from "./components/Titulo";
import useDadosPessoa from "./hooks/useDadosPessoa";
import IPessoa from "./types/IPessoa";

function App() {
  const { data: dataPessoa, refetch: refetchPessoa } = useDadosPessoa();
  const [pessoaEditando, setPessoaEditando] = useState<IPessoa | null>(null);

  const handleEditar = (pessoa: IPessoa) => {
    setPessoaEditando(pessoa);
  };

  return (
    <>
      <Cabecalho />
      <Container>
        <Titulo>Área Administrativa</Titulo>
        <Form
          atualizarTabela={refetchPessoa}
          pessoaEditando={pessoaEditando}
          setPessoaEditando={setPessoaEditando}
        />
        <Tabela
          pessoas={dataPessoa}
          handleEditar={handleEditar}
          atualizarTabela={refetchPessoa}
        />
      </Container>
      <Rodape />
    </>
  );
}

export default App;
