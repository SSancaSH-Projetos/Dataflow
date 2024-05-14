package com.devloopers.masternote.dto;

import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.UC;

public class UCDTO {
	
	private Long id;
    private String nomeUc;
    private String sigla;
    private Float cargaHoraria;
    private String modulo;
    private String conhecimentos;
    
    
    public UCDTO(UC uc) {
    	BeanUtils.copyProperties(uc, this);
	}
	
       
	public UCDTO() {
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomeUc() {
		return nomeUc;
	}
	public void setNomeUc(String nomeUc) {
		this.nomeUc = nomeUc;
	}
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
	public Float getCargaHoraria() {
		return cargaHoraria;
	}
	public void setCargaHoraria(Float cargaHoraria) {
		this.cargaHoraria = cargaHoraria;
	}
	public String getModulo() {
		return modulo;
	}
	public void setModulo(String modulo) {
		this.modulo = modulo;
	}
	public String getConhecimentos() {
		return conhecimentos;
	}
	public void setConhecimentos(String conhecimentos) {
		this.conhecimentos = conhecimentos;
	}
    
    
    

}
