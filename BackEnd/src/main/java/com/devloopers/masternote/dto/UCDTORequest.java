package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
