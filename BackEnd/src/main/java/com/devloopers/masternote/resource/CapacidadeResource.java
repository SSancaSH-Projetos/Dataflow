package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.devloopers.masternote.dto.SADTOResponse;
import com.devloopers.masternote.entity.*;
import com.devloopers.masternote.repository.CriterioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devloopers.masternote.dto.CapacidadeDTORequest;
import com.devloopers.masternote.dto.CapacidadeDTOResponse;
import com.devloopers.masternote.repository.CapacidadeRepository;
import com.devloopers.masternote.repository.UCRepository;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/capacidade")

public class CapacidadeResource {
	
	 @Autowired
	    private CapacidadeRepository capacidadeRepository;
	    
	    @Autowired
	    private UCRepository ucRepository;

		@Autowired
		private CriterioRepository criterioRepository;
	
	
	@GetMapping
    public List<CapacidadeDTOResponse> findAll() {
        List<Capacidade> capacidade = capacidadeRepository.findAll();
        return capacidade.stream()
        		.map(CapacidadeDTOResponse::fromCapacidade)
        		.collect(Collectors.toList());
        
    }
	
	@GetMapping("/pesquisaTipo/{tipo}")
	public Iterable<Capacidade> findByTipo(@PathVariable String tipo){
		return capacidadeRepository.findByTipo(tipo);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public CapacidadeDTOResponse findById(@PathVariable Long id) {
		Capacidade capacidade = capacidadeRepository.findById(id).get();
		return CapacidadeDTOResponse.fromCapacidade(capacidade);
		
	}

	@GetMapping("/pesquisaCriteriosDaCapacidade/{id}")
	public List<Criterio> findByIdCapacidadeCriterio(@PathVariable Long id){
		return criterioRepository.findByCapacidadeId(id);
	}
	
	@PostMapping
	public ResponseEntity<?> createCapacidade(@RequestBody CapacidadeDTORequest capacidadeDTO) {
		Capacidade cap = Capacidade.of(capacidadeDTO);
		Optional<UC> ucRecebido = ucRepository.findById(capacidadeDTO.getUcId());
		if (ucRecebido.isPresent()) {
			cap.setUc(ucRecebido.get());
			capacidadeRepository.save(cap);
			return ResponseEntity.ok(CapacidadeDTOResponse.fromCapacidade(cap));
		} else {
			// Crie uma mensagem de erro ou objeto de erro adequado
			String errorMessage = "UC not found with id: " + capacidadeDTO.getUcId();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<CapacidadeDTOResponse> updateCapacidade(@PathVariable Long id, @RequestBody CapacidadeDTORequest capacidadeDTO) {
		Optional<Capacidade> capacidadeOptional = capacidadeRepository.findById(id);
		
		if (capacidadeOptional.isPresent()) {
			Capacidade capacidade = capacidadeOptional.get();
			capacidade.setDescricao(capacidadeDTO.getDescricao());
			capacidade.setTipo(capacidadeDTO.getTipo());
			capacidadeRepository.save(capacidade);
			return ResponseEntity.ok(CapacidadeDTOResponse.fromCapacidade(capacidade));
		} else {
			return ResponseEntity.notFound().build();
			
		}
			
	}
	@GetMapping("/contagemTotalCriticos/{ucId}")
	public long countTotalDeCriteriosCriticosByCapacidadeId(@PathVariable Long ucId) {
		return criterioRepository.countTotalDeCriteriosCriticosByUcId(ucId);
	}

	@GetMapping("/contagemTotalDesejavel/{ucId}")
	public long countTotalDeCriteriosDesejavelByCapacidadeId(@PathVariable Long ucId) {
		return criterioRepository.countTotalDeCriteriosDesejavelByUcId(ucId);
	}
	@DeleteMapping("/delete/{id}")
	public void deleteCapacidade(@PathVariable Long id) {
		capacidadeRepository.deleteById(id);
	}
	


}
