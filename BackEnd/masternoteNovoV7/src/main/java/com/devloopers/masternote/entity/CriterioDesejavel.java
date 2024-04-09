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
@Table(name = "criterio_desejavel")
public class CriterioDesejavel implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_criterio_desejavel")
    private Long id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "criterio_critico_id_criterio_critico")
    private CriterioCritico criterioCritico;

}
