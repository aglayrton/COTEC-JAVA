package com.cotec.projeto.entities;

import com.cotec.projeto.util.StatusDescricao;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tb_status")
@Getter
@Setter
@EqualsAndHashCode
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="status", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusDescricao descricao;

    @OneToMany(mappedBy = "status")
    private List<Pessoa> pessoasList;
}
