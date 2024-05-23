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

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvaliacaoDTORequest {

	private Long id;
	private Date data;
	private String resultado;
	private Curso curso;
	private Turma turma;
	private UC uc;
	private Aluno aluno;
	private Capacidade capacidade;
	private Criterio criterio;
	private SA Sa;
    
    

    

	
}
