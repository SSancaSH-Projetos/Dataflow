package com.devloopers.masternote.repository;


import com.devloopers.masternote.entity.Criterio;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;

import com.devloopers.masternote.entity.Avaliacao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {


	@Query("SELECT COUNT(c) FROM Avaliacao a " +
		       "JOIN a.criterio c " +
		       "WHERE a.uc.id = :ucId " +
		       "AND a.aluno.id = :alunoId " +
		       "AND a.resultado = 'atende' " +
		       "AND c.tipo = 'critico'")
		Long countAtendeCriticoCriteriosByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);

		@Query("SELECT COUNT(c) FROM Avaliacao a " +
		       "JOIN a.criterio c " +
		       "WHERE a.uc.id = :ucId " +
		       "AND a.aluno.id = :alunoId " +
		       "AND a.resultado = 'naoAtende' " +
		       "AND c.tipo = 'critico'")
		Long countNaoAtendeCriticoCriteriosByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);


	@Query("SELECT c FROM Avaliacao a " +
			"JOIN a.criterio c " +
			"WHERE a.uc.id = :ucId " +
			"AND a.aluno.id = :alunoId " +
			"AND a.resultado = 'naoAtende' " +
			"AND c.tipo = 'critico'")
	List<Criterio> findNaoAtendidoCriticoCriteriosByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);


	@Query("SELECT c FROM Avaliacao a " +
			"JOIN a.criterio c " +
			"WHERE a.uc.id = :ucId " +
			"AND a.aluno.id = :alunoId " +
			"AND a.resultado = 'naoAtende' " +
			"AND c.tipo = 'desejavel'")
	List<Criterio> findNaoAtendidoDesejavelCriteriosByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);
}
