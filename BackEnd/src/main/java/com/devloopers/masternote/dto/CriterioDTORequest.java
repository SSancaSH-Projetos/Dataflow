package com.devloopers.masternote.dto;



import com.devloopers.masternote.entity.Capacidade;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriterioDTORequest {
	
	
    private Long id;
    private String descricao;
    private Capacidade capacidade;
    private String tipo;

    
    
    
    

}
