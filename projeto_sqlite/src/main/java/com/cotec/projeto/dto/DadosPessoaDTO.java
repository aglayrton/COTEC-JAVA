package com.cotec.projeto.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CPF;

public record DadosPessoaDTO(
        Long id,
        @NotBlank(message = "o campo NOME não pode está em branco")
        String nome,
        @NotBlank(message = "o campo NOME não pode está em branco")
        String sobrenome,

        @NotBlank
        @CPF(message = "CPF INVÁLIDO")
        String cpf,
        StatusDTO status,
        String dataCadastro) {

}
