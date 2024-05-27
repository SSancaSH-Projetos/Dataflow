package com.devloopers.masternote.dto;

import java.sql.Date;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Avaliacao;
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
public class AvaliacaoDTOResponse {
	
	private Long id;

	private String resultado;
	private Curso curso;
	private Turma turma;
	private UC uc;
	private Aluno aluno;
	private Capacidade capacidade;
	private Criterio criterio;
	private SA Sa;
	
	public static AvaliacaoDTOResponse fromAvaliacao(Avaliacao ava) {
		AvaliacaoDTOResponse avaDTO = new AvaliacaoDTOResponse();
		avaDTO.setId(ava.getId());
		avaDTO.setResultado(ava.getResultado());
		avaDTO.setCurso(ava.getCurso());
		avaDTO.setTurma(ava.getTurma());
		avaDTO.setUc(ava.getUc());
		avaDTO.setAluno(ava.getAluno());
		avaDTO.setCapacidade(ava.getCapacidade());
		avaDTO.setCriterio(ava.getCriterio());
		avaDTO.setSa(ava.getSa());
		return avaDTO;
		
		
	}

}
