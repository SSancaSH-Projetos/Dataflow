package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterio;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.entity.SA;

public class AvaliacaoCriterioDTO {

	private Long id;
	private Aluno aluno;
	private Criterio criterioCritico;
	private SA Sa;
    private boolean resultado;
    
    
    public AvaliacaoCriterioDTO(AvaliacaoCriterio avaliacaoCriterioCritico) {
    	BeanUtils.copyProperties(avaliacaoCriterioCritico, this);
	}
    
	public AvaliacaoCriterioDTO() {
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Aluno getAluno() {
		return aluno;
	}
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	public Criterio getCriterioCritico() {
		return criterioCritico;
	}
	public void setCriterioCritico(Criterio criterioCritico) {
		this.criterioCritico = criterioCritico;
	}
	public SA getSa() {
		return Sa;
	}
	public void setSa(SA sa) {
		Sa = sa;
	}
	public boolean isResultado() {
		return resultado;
	}
	public void setResultado(boolean resultado) {
		this.resultado = resultado;
	}
    
    

	
}
