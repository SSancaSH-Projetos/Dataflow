package com.devloopers.masternote.entity;

import com.devloopers.masternote.dto.AlunoDTOResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@Table(name = "aluno")
@SQLDelete(sql = "UPDATE aluno SET deletedA = true WHERE id=?")
@Where(clause = "deletedA=false")
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

    @Column(name = "deletedA")
    private boolean deletedA = Boolean.FALSE;

    public static Aluno of(AlunoDTOResponse alunoDTO) {
        Aluno aluno = new Aluno();
        aluno.setId(alunoDTO.getId());
        aluno.setNome(alunoDTO.getNome());
        aluno.setNumeroChamada(alunoDTO.getNumeroChamada());
        aluno.setTurma(alunoDTO.getTurma());
        aluno.setDeletedA(alunoDTO.isDeletedA());
        return aluno;
    }
}
