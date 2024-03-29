import React, { useEffect, useState } from "react";
import CampoDigitacao from "../CampoDigitacao";
import CampoSelect from "../CampoSelect";
import IPessoa from "../../types/IPessoa";
import styled from "styled-components";
import axios from "axios";
import CampoCPF from "../CampoCPF";
import { Button } from "@mui/material";

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

interface Props {
  atualizarTabela: () => void;
  pessoaEditando: IPessoa | null;
  setPessoaEditando: (pessoa: IPessoa | null) => void;
}

export default function Form({
  atualizarTabela,
  pessoaEditando,
  setPessoaEditando,
}: Props) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCPF] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (pessoaEditando) {
      setNome(pessoaEditando.nome);
      setSobrenome(pessoaEditando.sobrenome);
      setCPF(pessoaEditando.cpf);
      setStatus(pessoaEditando.status.descricao);
    } else {
      setNome("");
      setSobrenome("");
      setCPF("");
      setStatus("");
    }
  }, [pessoaEditando]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const novaPessoa: IPessoa = {
      nome,
      sobrenome,
      cpf,
      status: { descricao: status },
    };

    const endpoint = pessoaEditando
      ? `http://localhost:8080/pessoas/${pessoaEditando.id}`
      : "http://localhost:8080/pessoas";

    if (pessoaEditando) {
      axios
        .put(endpoint, novaPessoa)
        .then((result) => {
          console.log(result);
          atualizarTabela();
          setPessoaEditando(null);
          handleLimparCampos();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(endpoint, novaPessoa)
        .then((result) => {
          console.log(result);
          atualizarTabela();
          setPessoaEditando(null);
          handleLimparCampos();
        })
        .catch((error) => {
          console.log("deu ruim");
          console.log(error);
          alert(error.response.data.errors[0].message);
        });
    }
  }

  const handleLimparCampos = () => {
    setNome("");
    setSobrenome("");
    setCPF("");
    setStatus("");
  };

  return (
    <>
      <h1>Cadastro de Pessoas</h1>
      <StyledForm onSubmit={handleSubmit}>
        <CampoDigitacao
          tipo='text'
          label='Nome'
          valor={nome}
          placeholder='Insira seu nome'
          onChange={setNome}
        />
        <CampoDigitacao
          tipo='text'
          label='Sobrenome'
          valor={sobrenome}
          placeholder='Insira seu sobrenome'
          onChange={setSobrenome}
        />
        <CampoCPF
          tipo='text'
          label='CPF'
          valor={cpf}
          placeholder='Insira seu cpf'
          onChange={setCPF}
        />
        <CampoSelect
          label='Selecione o status'
          valor={status}
          onChange={setStatus}
          options={[
            { label: "Ativo", value: "ATIVO" },
            { label: "Inativo", value: "INATIVO" },
          ]}
        />
        <Button type='submit' color='success' variant='contained'>
          {pessoaEditando ? "Atualizar" : "Cadastrar"}
        </Button>
        <Button type='button' onClick={handleLimparCampos} variant="outlined">
          Limpar Campos
        </Button>
      </StyledForm>
    </>
  );
}