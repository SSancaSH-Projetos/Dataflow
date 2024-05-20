package com.devloopers.masternote.dto;


import com.devloopers.masternote.entity.UC;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CapacidadeDTORequest {

	
	private Long id;
    private String descricao;
    private String tipo;
    private UC uc;
    
    
 
    
    
    
}
