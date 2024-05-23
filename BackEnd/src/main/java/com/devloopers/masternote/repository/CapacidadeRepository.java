package com.devloopers.masternote.repository;

import java.util.List;

import com.devloopers.masternote.entity.UC;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Capacidade;
import org.springframework.stereotype.Repository;

@Repository
public interface CapacidadeRepository extends JpaRepository<Capacidade, Long>{
	
	List<Capacidade> findByTipo(String tipo);

	List<Capacidade> findByUc(UC ucId);
}
