package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.entity.Turma;

public class TurmaDTO {
	
	 private Long id;
     private String sigla;
     private Curso curso;
     
 	public TurmaDTO(Turma turma) {
 		BeanUtils.copyProperties(turma, this);
 	}
     
     
	public TurmaDTO() {
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
	public Curso getCurso() {
		return curso;
	}
	public void setCurso(Curso curso) {
		this.curso = curso;
	}
     
     

}
