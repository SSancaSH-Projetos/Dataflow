package com.devloopers.masternote.repository;
import com.devloopers.masternote.entity.Criterio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriterioRepository extends JpaRepository<Criterio, Long>{
	
	



	

//	@Query("SELECT COUNT(c) FROM Criterio c " +
//		       "WHERE c.tipo = 'Desejável' " +
//		       "AND c.uc.id = :ucId")
//		long countTotalDeCriteriosDesejaveisByUcId(@Param("ucId") Long ucId);


    List<Criterio> findByCapacidadeId(Long capacidadeId);
    
    



}
