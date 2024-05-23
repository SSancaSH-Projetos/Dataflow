package com.devloopers.masternote.repository;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.Criterio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriterioRepository extends JpaRepository<Criterio, Long>{
		
	@Query("SELECT COUNT(c) FROM Criterio c WHERE c.tipo LIKE '%D%'")
    long countByTipoContainingD();
	
	@Query("SELECT COUNT(c) FROM Criterio c WHERE c.tipo LIKE '%C%'")
    long countByTipoContainingC();

    List<Criterio> findByCapacidadeId(Long capacidadeId);



}
