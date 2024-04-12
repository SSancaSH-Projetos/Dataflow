package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Curso;

public class CursoDTO {
	
	private Long id;
    private String nome;
    private Float cargaHoraria;
    private String nivel;
    
    public CursoDTO(Curso curso) {
    	BeanUtils.copyProperties(curso, this);
	}
    
    
	public CursoDTO() {
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Float getCargaHoraria() {
		return cargaHoraria;
	}
	public void setCargaHoraria(Float cargaHoraria) {
		this.cargaHoraria = cargaHoraria;
	}
	public String getNivel() {
		return nivel;
	}
	public void setNivel(String nivel) {
		this.nivel = nivel;
	}

    
    
}
