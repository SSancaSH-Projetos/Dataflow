package com.devloopers.masternote.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    private Long id;

    @Column(name = "sigla")
    private String sigla;

    @ManyToOne
    @JoinColumn(name = "curso_id_curso")
    private Curso curso;

    @OneToMany(mappedBy = "turma")
    private List<Aluno> alunos;

    // Getters and Setters
}