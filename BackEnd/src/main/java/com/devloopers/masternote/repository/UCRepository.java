package com.devloopers.masternote.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.devloopers.masternote.entity.UC;

@Repository
public interface UCRepository extends JpaRepository<UC, Long>{

	List<UC> findBySigla(String sigla);

	List<UC> findByCursoId(Long cursoId);
	
}
