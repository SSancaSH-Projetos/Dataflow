package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Turma;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTORequest {
	
	private Long id;
    private String nome;
    private Integer numeroChamada;
    private Turma turma;


}
