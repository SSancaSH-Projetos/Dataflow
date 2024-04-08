package com.devloopers.masternote.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devloopers.masternote.entity.Curso;


@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

	List<Curso> findByNome(String nome);
}
	
	


