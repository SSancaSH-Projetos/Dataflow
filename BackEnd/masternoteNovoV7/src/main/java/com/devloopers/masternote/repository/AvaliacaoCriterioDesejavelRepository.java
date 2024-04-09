package com.devloopers.masternote.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioDesejavel;


public interface AvaliacaoCriterioDesejavelRepository extends JpaRepository<AvaliacaoCriterioDesejavel, Long>{

	Iterable<AvaliacaoCriterioDesejavel> findByAluno(Aluno aluno);
}
