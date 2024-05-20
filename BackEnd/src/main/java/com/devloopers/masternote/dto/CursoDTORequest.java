package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CursoDTORequest {
	
	private Long id;
    private String nome;
    private Float cargaHoraria;
    private String nivel;

}
