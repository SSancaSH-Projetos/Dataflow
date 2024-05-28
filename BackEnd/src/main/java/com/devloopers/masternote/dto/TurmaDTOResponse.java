package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDTOResponse {

	private Long id;
	private String sigla;
	private CursoDTOResponse curso;
	private List<Aluno> alunosNaTurma;

	// Método para transformar Turma em TurmaDTO
	public static TurmaDTOResponse fromTurma(Turma turma) {
		TurmaDTOResponse turmaDTO = new TurmaDTOResponse();
		turmaDTO.setId(turma.getId());
		turmaDTO.setSigla(turma.getSigla());
		turmaDTO.setCurso(CursoDTOResponse.fromCurso(turma.getCurso()));
		turmaDTO.setAlunosNaTurma(turma.getAlunos());
		return turmaDTO;
	}
}