package com.devloopers.masternote.dto;



import com.devloopers.masternote.entity.Curso;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CursoDTOResponse {
	
	private Long id;
    private String nome;
    private Float cargaHoraria;
    private String nivel;

    public static CursoDTOResponse fromCurso(Curso curso) {
    	CursoDTOResponse cursoDTO = new CursoDTOResponse();
    	cursoDTO.setId(curso.getId());
    	cursoDTO.setNome(curso.getNome());
    	cursoDTO.setNivel(curso.getNivel());
    	cursoDTO.setCargaHoraria(curso.getCargaHoraria());
    	return cursoDTO;
    }
}
