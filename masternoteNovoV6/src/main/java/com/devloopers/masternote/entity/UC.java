package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "uc")
public class UC implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_uc")
    private Long id;

    @Column(name = "nome_uc")
    private String nomeUc;

    private String sigla;

    @Column(name = "carga_horaria")
    private Float cargaHoraria;

    private String modulo;
    
    private String conhecimentos;
    
    @JsonIgnore
    @OneToMany(mappedBy = "uc")
    private List<Capacidade> capacidades;
    
    @JsonIgnore
    @OneToMany(mappedBy = "uc")
    private List<SA> sas;

    // getters e setters
}
