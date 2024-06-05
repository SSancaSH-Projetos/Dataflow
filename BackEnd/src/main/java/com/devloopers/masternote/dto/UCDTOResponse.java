package com.devloopers.masternote.dto;

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
public class UCDTOResponse {
	
	private Long id;
    private String nomeUC;
    private String sigla;
    private Float cargaHoraria;
    private String modulo;
    private String conhecimentos;
    private CursoDTOResponse curso;


    public static UCDTOResponse fromUC(UC uc) {
        UCDTOResponse ucDTO = new UCDTOResponse();
        ucDTO.setId(uc.getId());
        ucDTO.setNomeUC(uc.getNomeUc());
        ucDTO.setSigla(uc.getSigla());
        ucDTO.setCargaHoraria(uc.getCargaHoraria());
        ucDTO.setModulo(uc.getModulo());
        ucDTO.setConhecimentos(uc.getConhecimentos());
        ucDTO.setCurso(CursoDTOResponse.fromCurso(uc.getCurso()));
        return ucDTO;
    }


    
    

}
