package com.devloopers.masternote.entity;

import java.io.Serializable;

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


@Data
@Entity
@Table(name = "sa")
public class SA implements Serializable {
	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sa")
    private Long id;

    private String titulo;

    private String descricao;

    private String tipo;
      
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "uc_id_uc")
    private UC uc;
    
//    @ManyToMany
//    @JoinTable(name = "associativaCD",
//               joinColumns = @JoinColumn(name = "avaliacao_aluno_id"),
//               inverseJoinColumns = @JoinColumn(name = "avaliacao_sa_id_sa"))
//    private List<Aluno> alunosCD;
//
//    @ManyToMany
//    @JoinTable(name = "associativaCC",
//               joinColumns = @JoinColumn(name = "avaliacao_aluno_id"),
//               inverseJoinColumns = @JoinColumn(name = "avaliacao_sa_id_sa"))
//    private List<Aluno> alunos;

    // getters e setters

}

