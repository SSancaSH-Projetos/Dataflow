package com.devloopers.masternote.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SADTORequest {

    private Long id;

    private String titulo;

    private String descricao;

    private String tipo;

    private Long ucId;
}
