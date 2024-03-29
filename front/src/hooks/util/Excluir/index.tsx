import {  useState } from "react";
import axios from "axios";
import IPessoa from "../../../types/IPessoa";

function ExcluirPessoaButton({
  pessoa,
  onExcluir,
  atualizarTabela,
}: {
  pessoa: IPessoa;
  onExcluir: (id: string | undefined) => void;
  atualizarTabela: () => void;
}) {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleExcluir = () => {
    if (pessoa.status.descricao === "ATIVO") {
      alert("Não é possível excluir uma pessoa ATIVA.");
    } else {
      setMostrarAlerta(true);
    }
  };

  const confirmarExclusao = () => {
    axios
      .delete(`http://localhost:8181/pessoas/${pessoa.id}`)
      .then(() => {
        onExcluir(pessoa.id);
        setMostrarAlerta(false);
        atualizarTabela();
      })
      .catch((error) => {
        console.error("Erro ao excluir pessoa:", error);
      });
  };

  const cancelarExclusao = () => {
    setMostrarAlerta(false);
  };

  return (
    <>
      <button onClick={handleExcluir}>Excluir</button>
      {mostrarAlerta && (
        <div>
          <p>Deseja realmente excluir esta pessoa?</p>
          <button onClick={confirmarExclusao}>Sim</button>
          <button onClick={cancelarExclusao}>Não</button>
        </div>
      )}
    </>
  );
}

export default ExcluirPessoaButton;
