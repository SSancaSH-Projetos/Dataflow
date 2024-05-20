package com.devloopers.masternote.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;

import com.devloopers.masternote.entity.AvaliacaoCriterio;


public interface AvaliacaoCriterioRepository extends JpaRepository<AvaliacaoCriterio, Long> {

		Iterable<AvaliacaoCriterio> findByAluno(Aluno aluno);
}
