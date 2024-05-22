package com.devloopers.masternote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devloopers.masternote.entity.Aluno;


@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
	List<Aluno> findByNome(String nome);
	List<Aluno> findByNumeroChamada(Integer numeroChamada);
	  @Query("SELECT a FROM Aluno a WHERE a.turma.id = :turmaId")
	    List<Aluno> findAlunosByTurmaId(@Param("turmaId") Long turmaId);
}


