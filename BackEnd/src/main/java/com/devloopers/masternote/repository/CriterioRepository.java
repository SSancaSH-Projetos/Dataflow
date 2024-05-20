package com.devloopers.masternote.repository;
import com.devloopers.masternote.entity.Criterio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriterioRepository extends JpaRepository<Criterio, Long>{
	

}
