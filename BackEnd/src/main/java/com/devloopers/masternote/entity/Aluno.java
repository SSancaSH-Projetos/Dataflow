package com.devloopers.masternote.entity;


import com.devloopers.masternote.dto.AlunoDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@Table(name = "aluno")
@SQLDelete(sql = "UPDATE table_product SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
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

    @Column(name= "deletedA")
    private boolean deletedA = Boolean.FALSE;
    
//    @JsonIgnore
//    @ManyToMany
//    @JoinTable(
//        name = "aluno_turma",
//        joinColumns = @JoinColumn(name = "aluno_id"),
//        inverseJoinColumns = @JoinColumn(name = "turma_id")
//    )
//    private List<Turma> turmas;
    
    
    public static Aluno of(AlunoDTO alunoDTO) {
    	Aluno aluno = new Aluno();
    	aluno.setId(alunoDTO.getId());
    	aluno.setNome(alunoDTO.getNome());
    	aluno.setNumeroChamada(alunoDTO.getNumeroChamada());
    	aluno.setTurma(alunoDTO.getTurma());
        aluno.setDeletedA(alunoDTO.isDeletedA());
    	return aluno;
    }
}