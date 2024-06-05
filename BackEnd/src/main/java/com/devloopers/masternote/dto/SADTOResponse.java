package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.devloopers.masternote.entity.SA;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SADTOResponse {
	
	private Long id;
    private String titulo;
    private String descricao;
    private String tipo;
    private UCDTOResponse uc;

	public static SADTOResponse fromSA(SA sa) {
		SADTOResponse saDTO = new SADTOResponse();
		saDTO.setId(sa.getId());
		saDTO.setTitulo(sa.getTitulo());
		saDTO.setDescricao(sa.getDescricao());
		saDTO.setTipo(sa.getTipo());
		saDTO.setUc(UCDTOResponse.fromUC(sa.getUc()));
		return saDTO;
	}
    

}
