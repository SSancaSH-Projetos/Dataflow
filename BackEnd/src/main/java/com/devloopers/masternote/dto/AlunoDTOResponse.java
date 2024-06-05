package com.devloopers.masternote.dto;


import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Turma;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTOResponse {


    private Long id;
    private String nome;
    private Integer numeroChamada;
    private Turma turma;
    
	public static AlunoDTOResponse fromAluno(Aluno al) {
		AlunoDTOResponse alDTO = new AlunoDTOResponse();
		alDTO.setId(al.getId());
		alDTO.setNome(al.getNome());
		alDTO.setNumeroChamada(al.getNumeroChamada());
		alDTO.setTurma(al.getTurma());
		return alDTO;
	}
        
   
}
