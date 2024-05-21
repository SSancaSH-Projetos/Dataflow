package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Turma;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTORequest {
	
	private Long id;
    private String nome;
    private Integer numeroChamada;
    private Turma turma;


}
