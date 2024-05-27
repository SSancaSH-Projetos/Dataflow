package com.devloopers.masternote.entity;

import com.devloopers.masternote.dto.AlunoDTOResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numero_chamada")
    private Integer numeroChamada;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "turma_id_turma")
    private Turma turma;

    public Aluno(Long id) {
        this.id = id;
    }

    public static Aluno of(AlunoDTOResponse alunoDTO) {
        Aluno aluno = new Aluno();
        aluno.setId(alunoDTO.getId());
        aluno.setNome(alunoDTO.getNome());
        aluno.setNumeroChamada(alunoDTO.getNumeroChamada());
        aluno.setTurma(alunoDTO.getTurma());

        return aluno;
    }
}
