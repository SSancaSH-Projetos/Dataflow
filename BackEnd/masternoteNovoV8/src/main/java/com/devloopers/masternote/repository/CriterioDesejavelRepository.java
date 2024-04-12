
package com.devloopers.masternote.repository;
import com.devloopers.masternote.entity.CriterioDesejavel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

	@Repository
	public interface CriterioDesejavelRepository extends JpaRepository<CriterioDesejavel, Long>{
		

	}


