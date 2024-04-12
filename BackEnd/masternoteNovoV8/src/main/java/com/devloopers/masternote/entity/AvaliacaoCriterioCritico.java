package com.devloopers.masternote.entity;

import java.io.Serializable;

import com.devloopers.masternote.dto.AvaliacaoCriterioCriticoDTO;

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
@Table(name = "avaliacaoCriterioCritico")
public class AvaliacaoCriterioCritico implements Serializable {
	private static final long serialVersionUID = 1L;
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id_avaliacaoCriterioCritico")
	 private Long id;
	
    
	@ManyToOne
    @JoinColumn(name = "aluno_id")
	private Aluno aluno;
	
    
    @ManyToOne
    @JoinColumn(name = "criterioCritico_id")
    private CriterioCritico criterioCritico;
    
    @ManyToOne
    @JoinColumn(name = "sa_id")
    private SA Sa;
        
    
    @Column(name = "resultado")
  	private boolean resultado;
    
    
    public static AvaliacaoCriterioCritico of(AvaliacaoCriterioCriticoDTO aCCDTO) {
    	AvaliacaoCriterioCritico aCC = new AvaliacaoCriterioCritico();
    	aCC.setAluno(aCCDTO.getAluno());
    	aCC.setId(aCCDTO.getId());
    	aCC.setCriterioCritico(aCCDTO.getCriterioCritico());
    	aCC.setResultado(aCCDTO.isResultado());
    	aCC.setSa(aCCDTO.getSa());
    	return aCC;
    }
   
}
