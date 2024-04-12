package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.CriterioCritico;
import com.devloopers.masternote.entity.CriterioDesejavel;


public class CriterioDesejavelDTO {
	
    private Long id;
    private String descricao;
    private CriterioCritico criterioCritico;
    
    
	public CriterioDesejavelDTO(CriterioDesejavel criterioDesejavel) {
		BeanUtils.copyProperties(criterioDesejavel, this);
	}
    
    
	public CriterioDesejavelDTO() {
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
	public CriterioCritico getCriterioCritico() {
		return criterioCritico;
	}
	public void setCriterioCritico(CriterioCritico criterioCritico) {
		this.criterioCritico = criterioCritico;
	}
    
    

}
