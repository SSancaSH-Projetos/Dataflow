package com.devloopers.masternote.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
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

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "turma_id_turma")
//    private Turma turma;
    
//    @JsonIgnore
//    @ManyToMany
//    @JoinTable(
//        name = "aluno_turma",
//        joinColumns = @JoinColumn(name = "aluno_id"),
//        inverseJoinColumns = @JoinColumn(name = "turma_id")
//    )
//    private List<Turma> turmas;
}