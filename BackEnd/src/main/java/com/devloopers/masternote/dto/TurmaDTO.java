package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.entity.Turma;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDTO {

	private Long id;
	private String sigla;
	private Long curso;
	private Boolean isDeleted; // Modificado para Boolean

	// Método para transformar Turma em TurmaDTO
	public static TurmaDTO fromTurma(Turma turma) {
		TurmaDTO turmaDTO = new TurmaDTO();
		turmaDTO.setId(turma.getId());
		turmaDTO.setSigla(turma.getSigla());
		turmaDTO.setCurso(turma.getCurso().getId());
		return turmaDTO;
	}
}