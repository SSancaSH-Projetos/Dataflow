package com.devloopers.masternote.repository;
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

	@Query("SELECT COUNT(c) FROM Criterio c WHERE c.tipo = 'Crítico' AND c.capacidade.id = :capacidadeId")
    long countTotalDeCriteriosCriticosByCapacidadeId(Long capacidadeId);
    
    @Query("SELECT COUNT(c) FROM Criterio c WHERE c.tipo = 'Desejável' AND c.capacidade.id = :capacidadeId")
    long countTotalDeCriteriosDesejavelByCapacidadeId(Long capacidadeId);
    
    List<Criterio> findByCapacidadeId(Long capacidadeId);



}
