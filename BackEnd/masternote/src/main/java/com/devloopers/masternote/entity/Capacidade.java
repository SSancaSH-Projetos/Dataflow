package com.devloopers.masternote.entity;

import java.io.Serializable;

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
@Table(name = "capacidade")
public class Capacidade implements Serializable {
	private static final long serialVersionUID = 1L; 
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_capacidade")
    private Long id;

    private String descricao;

    private Integer tipo;

    @ManyToOne
    @JoinColumn(name = "uc_id_uc")
    private UC uc;

    @ManyToOne
    @JoinColumn(name = "sa_id_sa")
    private SA sa;

    // getters e setters
}

