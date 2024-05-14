package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioCritico;
import com.devloopers.masternote.entity.CriterioCritico;
import com.devloopers.masternote.entity.SA;

public class AvaliacaoCriterioCriticoDTO {

	private Long id;
	private Aluno aluno;
	private CriterioCritico criterioCritico;
	private SA Sa;
    private boolean resultado;
    
    
    public AvaliacaoCriterioCriticoDTO(AvaliacaoCriterioCritico avaliacaoCriterioCritico) {
    	BeanUtils.copyProperties(avaliacaoCriterioCritico, this);
	}
    
	public AvaliacaoCriterioCriticoDTO() {
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
	public CriterioCritico getCriterioCritico() {
		return criterioCritico;
	}
	public void setCriterioCritico(CriterioCritico criterioCritico) {
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
