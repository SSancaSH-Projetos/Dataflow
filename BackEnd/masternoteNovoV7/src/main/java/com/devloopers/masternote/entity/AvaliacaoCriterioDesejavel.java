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
@Table(name = "avaliacaoCriterioDesejavel")

public class AvaliacaoCriterioDesejavel implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id_avaliacaoCriterioDesejavel")
	 private Long id;
	
    
    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;
    
    
    @ManyToOne
    @JoinColumn(name = "criterioDesejavel_id")
    private CriterioDesejavel criterioDesejavel;
    
    
    @ManyToOne
    @JoinColumn(name = "sa_id")
    private SA Sa;
    
    @Column(name = "resultado")
  	private boolean resultado;
    
   

  
}

	

