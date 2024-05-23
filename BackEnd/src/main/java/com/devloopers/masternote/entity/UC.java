package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;

import com.devloopers.masternote.dto.UCDTORequest;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
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
    @ManyToOne
    @JoinColumn(name = "cursoId")
    private Curso curso;
    
    @JsonIgnore
    @OneToMany(mappedBy = "uc", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Capacidade> capacidades;
    
    @JsonIgnore
    @OneToMany(mappedBy = "uc", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<SA> sas;

    // getters e setters
    
    
    public static UC of(UCDTORequest ucDTO) {
    	UC uc = new UC();
    	uc.setId(ucDTO.getId());
    	uc.setNomeUc(ucDTO.getNomeUC());
    	uc.setSigla(ucDTO.getSigla());
    	uc.setCargaHoraria(ucDTO.getCargaHoraria());
    	uc.setModulo(ucDTO.getModulo());
    	uc.setConhecimentos(ucDTO.getConhecimentos());
    	return uc;
    }
}
