package com.devloopers.masternote.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devloopers.masternote.entity.Capacidade;


public interface CapacidadeRepository extends JpaRepository<Capacidade, Long>{
	
	List<Capacidade> findByTipo(String tipo);
}
