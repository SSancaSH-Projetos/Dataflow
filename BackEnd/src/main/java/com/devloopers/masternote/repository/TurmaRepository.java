package com.devloopers.masternote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.devloopers.masternote.entity.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long>{

	List<Turma> findBySigla(String sigla);

	List<Turma> findByCursoId(Long cursoId);

}
