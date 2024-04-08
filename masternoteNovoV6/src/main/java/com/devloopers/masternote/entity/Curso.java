package com.devloopers.masternote.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "curso")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Long id;

    @Column(name = "nome_curso")
    private String nome;

    @Column(name = "carga_horaria")
    private Float cargaHoraria;

    @Column(name = "nivel")
    private String nivel;

  // @OneToMany(mappedBy = "curso")
  // private List<Turma> turmas;

    // Getters and Setters
}