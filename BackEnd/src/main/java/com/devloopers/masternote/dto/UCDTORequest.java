package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UCDTORequest {
	
	private Long id;
    private String nomeUC;
    private String sigla;
    private Float cargaHoraria;
    private String modulo;
    private String conhecimentos;
    private Long curso;







}
