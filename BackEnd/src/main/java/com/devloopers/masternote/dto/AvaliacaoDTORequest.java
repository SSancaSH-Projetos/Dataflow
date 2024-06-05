package com.devloopers.masternote.dto;

import java.sql.Date;


import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.entity.Turma;
import com.devloopers.masternote.entity.UC;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AvaliacaoDTORequest {

	private Long id;
	private String resultado;
	private Long curso;
	private Long turma;
	private Long uc;
	private Long aluno;
	private Long capacidade;
	private Long criterio;
	private Long sa;
    
    

    

	
}
