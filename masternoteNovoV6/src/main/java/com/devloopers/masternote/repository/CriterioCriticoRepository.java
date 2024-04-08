package com.devloopers.masternote.repository;
import com.devloopers.masternote.entity.CriterioCritico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriterioCriticoRepository extends JpaRepository<CriterioCritico, Long>{
	

}
