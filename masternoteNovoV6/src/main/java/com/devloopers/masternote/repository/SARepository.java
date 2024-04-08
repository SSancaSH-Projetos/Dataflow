package com.devloopers.masternote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.devloopers.masternote.entity.SA;

@Repository
public interface SARepository extends JpaRepository<SA, Long> {

	List<SA> findByTitulo(String titulo);
	List<SA> findByTipo(String tipo);
	
	
	
	
}
