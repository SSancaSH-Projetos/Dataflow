package com.devloopers.masternote.repository;


import com.devloopers.masternote.entity.Criterio;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Aluno;

import com.devloopers.masternote.entity.Avaliacao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


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
		
		
		@Query("SELECT COUNT(c) FROM Avaliacao a " +
			       "JOIN a.criterio c " +
			       "WHERE a.uc.id = :ucId " +
			       "AND a.aluno.id = :alunoId " +
			       "AND a.resultado = 'atende' " +
			       "AND c.tipo = 'desejavel'")
			Long countAtendeDesejaveisByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);

			@Query("SELECT COUNT(c) FROM Avaliacao a " +
			       "JOIN a.criterio c " +
			       "WHERE a.uc.id = :ucId " +
			       "AND a.aluno.id = :alunoId " +
			       "AND a.resultado = 'naoAtende' " +
			       "AND c.tipo = 'desejavel'")
			Long countNaoAtendeDesejaveisByAlunoAndUc(@Param("alunoId") Long alunoId, @Param("ucId") Long ucId);


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
	
	@Query("SELECT a.resultado FROM Avaliacao a " +
		       "JOIN a.uc uc " +
		       "JOIN a.capacidade cap " +
		       "JOIN a.criterio c " +
		       "JOIN a.aluno al " +
		       "WHERE uc.id = :ucId " +
		       "AND cap.id = :capacidadeId " +
		       "AND c.id = :criterioId " +
		       "AND al.id = :alunoId")
		String findResultadoByUcCapacidadeCriterioAluno(@Param("ucId") Long ucId, 
		                                                @Param("capacidadeId") Long capacidadeId, 
		                                                @Param("criterioId") Long criterioId, 
		                                                @Param("alunoId") Long alunoId);

		@Query("SELECT a FROM Avaliacao a " +
					"WHERE a.aluno.id = :alunoId " +
					"AND a.criterio.id = :criterioId")
			Optional<Avaliacao> findByAlunoIdAndCriterioId(@Param("alunoId") Long alunoId, @Param("criterioId") Long criterioId);
	
		
}
