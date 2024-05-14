package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.CriterioCritico;


public class CriterioCriticoDTO {
	
	
    private Long id;
    private String descricao;
    private Capacidade capacidade;
    
	public CriterioCriticoDTO(CriterioCritico criterioCritico) {
		BeanUtils.copyProperties(criterioCritico, this);
	}
    
    
	public CriterioCriticoDTO() {
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
	public Capacidade getCapacidade() {
		return capacidade;
	}
	public void setCapacidade(Capacidade capacidade) {
		this.capacidade = capacidade;
	}
    
    
    
    

}
