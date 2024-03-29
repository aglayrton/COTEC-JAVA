package com.cotec.projeto.entities;

import com.cotec.projeto.dto.DadosPessoaDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "tb_pessoa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 60)
    private String nome;

    @Column(name = "sobrenome", nullable = false, length = 60)
    private String sobrenome;

    @Column(name = "cpf", nullable = false, length = 11, unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String dataCadastro;

    @PrePersist
    public void prePersist(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        dataCadastro = LocalDateTime.now().format(formatter);
    }


    public Pessoa(DadosPessoaDTO pessoa) {
        BeanUtils.copyProperties(pessoa, this);
    }

    public Pessoa(DadosPessoaDTO pessoa, Status status) {
        BeanUtils.copyProperties(pessoa, this);
        this.status = status;
    }
}
