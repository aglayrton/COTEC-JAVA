import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import IPessoa from "../../types/IPessoa";

import axios from "axios";
import { useState } from "react";

export function Tabela({
  pessoas,
  handleEditar,
  atualizarTabela,
}: {
  pessoas: IPessoa[] | null;
  handleEditar: (pessoa: IPessoa) => void;
  atualizarTabela: () => void;
}) {
  const handleExcluir = (id: string | undefined) => {
    if (id === undefined) {
      console.error("ID da pessoa é undefined. Não é possível excluir.");
      return;
    }

    const pessoa = pessoas?.find((p) => p.id === id);
    if (!pessoa) {
      console.error("Pessoa não encontrada para o id fornecido:", id);
      return;
    }

    console.log("Status da pessoa:", pessoa.status.descricao);

    if (pessoa.status.descricao === "ATIVO") {
      const confirmarExclusao = window.confirm("Esta pessoa está ativa");
      if (!confirmarExclusao) {
        console.log("Exclusão cancelada pelo usuário.");
        return;
      }
    } else {
      const confirmarExclusao = window.confirm(
        "Deseja realmente excluir a pessoa?"
      );
      if (confirmarExclusao) {
        console.log(`Excluindo pessoa com ID: ${id}`);
        // Adicione aqui a lógica para executar a exclusão da pessoa
        axios
          .delete(`http://localhost:8080/pessoas/${id}`)
          .then(() => {
            console.log("Pessoa excluída com sucesso.");
            atualizarTabela(); // Atualiza a tabela após a exclusão
          })
          .catch((error) => {
            console.error("Erro ao excluir a pessoa:", error);
          });
      }
      if (!confirmarExclusao) {
        console.log("Exclusão cancelada pelo usuário.");
        return;
      }
    }
  };
  const [busca, setBusca] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState<IPessoa[] | null>(
    null
  );

  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(5);
  const [colunaOrdenada, setColunaOrdenada] = useState<string>("");
  const [ordem, setOrdem] = useState<"asc" | "desc">("asc");

  const handleChangePagina = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    novaPagina: number
  ) => {
    setPagina(novaPagina);
  };

  type ColunaOrdenada = keyof IPessoa;

  const handleChangeLinhasPorPagina = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const handleChangeOrdem = (coluna: keyof IPessoa) => {
    const isAsc = colunaOrdenada === coluna && ordem === "asc";
    setOrdem(isAsc ? "desc" : "asc");
    setColunaOrdenada(coluna);
  };

  const handleBuscar = () => {
    let params: { [key: string]: string } = {};
    if (busca) {
      // Verifica se a busca é um CPF
      if (/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/.test(busca)) {
        params.cpf = busca;
      } else {
        params.nome = busca;
      }
      if (params.sobrenome) {
        params.sobrenome = busca;
      }
    }

    axios
      .post("http://localhost:8080/pessoas/filtros", params)
      .then((response) => {
        console.log("Dados filtrados:", response.data.content);
        setResultadosBusca(response.data.content);
      })
      .catch((error) => {
        console.error("Erro ao buscar pessoas:", error);
      });
  };

  const ordenar = (
    array: IPessoa[],
    coluna: keyof IPessoa,
    ordem: "asc" | "desc"
  ) => {
    return array.slice().sort((a, b) => {
      const valorA = a[coluna];
      const valorB = b[coluna];
      if (ordem === "asc") {
        if (valorA === undefined || valorB === undefined) return 0;
        if (valorA < valorB) return -1;
        if (valorA > valorB) return 1;
        return 0;
      } else {
        if (valorA === undefined || valorB === undefined) return 0;
        if (valorA > valorB) return -1;
        if (valorA < valorB) return 1;
        return 0;
      }
    });
  };

  const pessoasOrdenadas = ordenar(
    resultadosBusca || pessoas || [],
    colunaOrdenada as ColunaOrdenada, // Conversão para ColunaOrdenada
    ordem
  );

  const paginacao = (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component='div'
      count={pessoasOrdenadas.length}
      rowsPerPage={linhasPorPagina}
      page={pagina}
      onPageChange={handleChangePagina}
      onRowsPerPageChange={handleChangeLinhasPorPagina}
    />
  );

  return (
    <>
      <TextField
        label='Pesquise'
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        sx={{ marginBottom: "10px", marginRight: "10px" }}
      />
      <Button
        onClick={handleBuscar}
        variant='contained' // Adiciona um estilo de botão com fundo
        sx={{ bgcolor: "#4CAF50", color: "white", marginTop: "10px" }} // Define a cor de fundo verde e texto branco
      >
        Buscar
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='tabela-customizada'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={colunaOrdenada === "nome"}
                  direction={colunaOrdenada === "nome" ? ordem : "asc"}
                  onClick={() => handleChangeOrdem("nome")}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={colunaOrdenada === "sobrenome"}
                  direction={colunaOrdenada === "sobrenome" ? ordem : "asc"}
                  onClick={() => handleChangeOrdem("sobrenome")}
                >
                  Sobrenome
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={colunaOrdenada === "cpf"}
                  direction={colunaOrdenada === "cpf" ? ordem : "asc"}
                  onClick={() => handleChangeOrdem("cpf")}
                >
                  CPF
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoasOrdenadas
              .slice(
                pagina * linhasPorPagina,
                pagina * linhasPorPagina + linhasPorPagina
              )
              .map((pessoa) => (
                <TableRow key={pessoa.id}>
                  <TableCell>{pessoa.nome}</TableCell>
                  <TableCell>{pessoa.sobrenome}</TableCell>
                  <TableCell>{pessoa.cpf}</TableCell>
                  <TableCell>{pessoa.status.descricao}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditar(pessoa)}
                      variant='contained'
                      color='primary'
                      sx={{ marginRight: "8px" }} // Adiciona margem à direita do botão
                    >
                      Editar
                    </Button>

                    <Button
                      onClick={() => handleExcluir(pessoa.id)}
                      variant='contained'
                      color='error' // Define a cor de erro para o botão
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginacao}
    </>
  );
}
