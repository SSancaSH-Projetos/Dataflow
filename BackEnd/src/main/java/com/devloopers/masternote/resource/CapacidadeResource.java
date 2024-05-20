package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloopers.masternote.dto.CapacidadeDTORequest;
import com.devloopers.masternote.dto.CapacidadeDTOResponse;
import com.devloopers.masternote.entity.Capacidade;
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
	
	@PostMapping
	public CapacidadeDTOResponse createCapacidade(@RequestBody CapacidadeDTORequest capacidadeDTO) {
		Capacidade capacidade = Capacidade.of(capacidadeDTO);
		
		ucRepository.findById(capacidadeDTO.getUc().getId())
					.ifPresentOrElse(capacidade::setUc, () ->{
						throw new EntityNotFoundException("UC não encontada com o ID: " + capacidadeDTO.getUc());
					});
		
		Capacidade savedCap = capacidadeRepository.save(capacidade);
		
		return CapacidadeDTOResponse.fromCapacidade(savedCap);
		
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
	
	@DeleteMapping("/delete/{id}")
	public void deleteCapacidade(@PathVariable Long id) {
		capacidadeRepository.deleteById(id);
	}
	


}
