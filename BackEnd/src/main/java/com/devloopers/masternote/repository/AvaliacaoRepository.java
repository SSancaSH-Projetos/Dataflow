package com.devloopers.masternote.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;

import com.devloopers.masternote.entity.Avaliacao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

		Iterable<Avaliacao> findByAluno(Aluno aluno);

	@Query("SELECT COUNT(a) FROM Avaliacao a JOIN a.criterio c JOIN a.aluno al WHERE a.resultado = 's' AND c.tipo = 'Critico' AND al.id = :alunoId")
	long countByResultadoSAndCriterioTipoCAndAlunoId(@Param("alunoId") Long alunoId);


	@Query("SELECT COUNT(a) FROM Avaliacao a JOIN a.criterio c WHERE a.resultado = 's' AND c.tipo = 'Desejável'")
	long countByResultadoSAndCriterioTipoD();



}
