package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;

import com.devloopers.masternote.dto.CriterioDTORequest;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "criterio")
public class Criterio implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_criterio_critico")
    private Long id;
    
    
    private String descricao;

    @Column (name="tipo")
    private String tipo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "capacidade_id_capacidade")
    private Capacidade capacidade;

    public Criterio(Long id) {
        this.id = id;
    }


    // getters e setters
    
    public static Criterio of(CriterioDTORequest ccDTO) {
    	Criterio cc = new Criterio();
    	cc.setId(ccDTO.getId());
    	cc.setDescricao(ccDTO.getDescricao());
        cc.setTipo(ccDTO.getTipo());
    	return cc;
    }
}
