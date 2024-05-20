package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.devloopers.masternote.entity.Turma;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDTORequest {

	private Long id;
	private String sigla;
	private Long curso;
	private List<Integer> alunosNaTurma;

}