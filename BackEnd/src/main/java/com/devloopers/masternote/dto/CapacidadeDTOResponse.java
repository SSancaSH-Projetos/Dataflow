package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.UC;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CapacidadeDTOResponse {
	
	private Long id;
	private String descricao;
	private String tipo;
	private UC uc;

	public static CapacidadeDTOResponse fromCapacidade(Capacidade cap) {
		CapacidadeDTOResponse capDTO = new CapacidadeDTOResponse();
		capDTO.setId(cap.getId());
		capDTO.setDescricao(cap.getDescricao());
		capDTO.setTipo(cap.getTipo());
		capDTO.setUc(cap.getUc());
		return capDTO;
	}

}
