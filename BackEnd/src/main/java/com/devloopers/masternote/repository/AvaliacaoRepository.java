package com.devloopers.masternote.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;

import com.devloopers.masternote.entity.Avaliacao;


public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

		Iterable<Avaliacao> findByAluno(Aluno aluno);
		
}
