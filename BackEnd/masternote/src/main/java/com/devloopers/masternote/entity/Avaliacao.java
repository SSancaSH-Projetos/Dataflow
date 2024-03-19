package com.devloopers.masternote.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "avaliacao")
public class Avaliacao implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
    @Id
    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @Id
    @ManyToOne
    @JoinColumn(name = "sa_id_sa")
    private SA sa;

    @Column(name = "notaFinal")
    private Float notaFinal;

    // getters e setters
}
