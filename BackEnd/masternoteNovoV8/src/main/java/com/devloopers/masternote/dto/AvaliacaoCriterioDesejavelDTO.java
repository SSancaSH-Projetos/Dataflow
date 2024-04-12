package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioDesejavel;
import com.devloopers.masternote.entity.CriterioDesejavel;
import com.devloopers.masternote.entity.SA;

public class AvaliacaoCriterioDesejavelDTO {
	private Long id;
    private Aluno aluno;
    private CriterioDesejavel criterioDesejavel;
    private SA Sa;
   	private boolean resultado;
   	
	public AvaliacaoCriterioDesejavelDTO(AvaliacaoCriterioDesejavel avaliacaoCriterioDesejavel) {
		BeanUtils.copyProperties(avaliacaoCriterioDesejavel, this);
	}
   	
   	public AvaliacaoCriterioDesejavelDTO() {
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
	public CriterioDesejavel getCriterioDesejavel() {
		return criterioDesejavel;
	}
	public void setCriterioDesejavel(CriterioDesejavel criterioDesejavel) {
		this.criterioDesejavel = criterioDesejavel;
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
