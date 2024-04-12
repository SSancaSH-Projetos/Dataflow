package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.entity.UC;

public class SADTO {
	
	private Long id;
    private String titulo;
    private String descricao;
    private String tipo;
    private UC uc;
    
    
    public SADTO(SA sa) {
    	BeanUtils.copyProperties(sa, this);
	}
    
    
	public SADTO() {
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public UC getUc() {
		return uc;
	}
	public void setUc(UC uc) {
		this.uc = uc;
	}
    
    

}
