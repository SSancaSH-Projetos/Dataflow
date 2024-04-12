package com.devloopers.masternote.dto;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Turma;

public class AlunoDTO {


    private Long id;
    private String nome;
    private Integer numeroChamada;
    private Turma turma;
    
        
    public AlunoDTO(Aluno aluno) {
    	this.id = aluno.getId();
    	this.nome = aluno.getNome();
    	this.numeroChamada = aluno.getNumeroChamada();
    	this.turma = aluno.getTurma();
    }
    

	public AlunoDTO() {
	
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getNumeroChamada() {
		return numeroChamada;
	}

	public void setNumeroChamada(Integer numeroChamada) {
		this.numeroChamada = numeroChamada;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}
    
    
    
}
