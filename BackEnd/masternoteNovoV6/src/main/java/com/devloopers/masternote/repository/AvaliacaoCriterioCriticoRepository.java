package com.devloopers.masternote.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioCritico;


public interface AvaliacaoCriterioCriticoRepository extends JpaRepository<AvaliacaoCriterioCritico, Long> {

		Iterable<AvaliacaoCriterioCritico> findByAluno(Aluno aluno);
}
