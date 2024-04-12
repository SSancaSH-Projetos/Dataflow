package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.UC;


public class CapacidadeDTO {

	
	private Long id;
    private String descricao;
    private String tipo;
    private UC uc;
    
    
	public CapacidadeDTO(Capacidade capacidade) {
		BeanUtils.copyProperties(capacidade, this);
	}
	    
    public CapacidadeDTO() {
	}
		
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
