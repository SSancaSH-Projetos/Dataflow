package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.Criterio;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriterioDTOResponse {
	
	private Long id;
    private String descricao;
    private CapacidadeDTOResponse capacidade;
    private String tipo;
    
    public static CriterioDTOResponse fromCriterio(Criterio criterio) {
    	CriterioDTOResponse cDTO = new  CriterioDTOResponse();
    	cDTO.setId(criterio.getId());
    	cDTO.setDescricao(criterio.getDescricao());
    	cDTO.setTipo(criterio.getTipo());
    	cDTO.setCapacidade(CapacidadeDTOResponse.fromCapacidade(criterio.getCapacidade()));
    	return cDTO;
    	
    }

}
