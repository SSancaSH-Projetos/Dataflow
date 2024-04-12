package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.devloopers.masternote.dto.CapacidadeDTO;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.repository.CapacidadeRepository;

@RestController
@RequestMapping("/capacidade")

public class CapacidadeResource {
	
	@Autowired
	private  CapacidadeRepository capacidadeRepository;
	
	@GetMapping
    public Iterable<CapacidadeDTO> findAll() {
        Iterable<Capacidade> capacidades = capacidadeRepository.findAll();
        List<CapacidadeDTO> capacidadesDTO = new ArrayList<>();
        for (Capacidade capacidade : capacidades) {
            CapacidadeDTO capacidadeDTO = new CapacidadeDTO(capacidade);
            capacidadesDTO.add(capacidadeDTO);
        }
        return capacidadesDTO;
    }
	
	@GetMapping("/pesquisaTipo/{tipo}")
	public Iterable<Capacidade> findByTipo(@PathVariable String tipo){
		return capacidadeRepository.findByTipo(tipo);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public CapacidadeDTO findById(@PathVariable Long id) {
		Capacidade capacidade = capacidadeRepository.findById(id).orElse(null);
		CapacidadeDTO capacidadeDTO = new CapacidadeDTO (capacidade);
		return capacidadeDTO;
	}
	
	@PostMapping
	public CapacidadeDTO createCapacidade(@RequestBody CapacidadeDTO capacidadeDTO) {
		Capacidade capacidade = Capacidade.of(capacidadeDTO);
		return new CapacidadeDTO(capacidadeRepository.save(capacidade));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<CapacidadeDTO> updateCapacidade(@PathVariable Long id, @RequestBody CapacidadeDTO capacidadeDTO) {
		Optional<Capacidade> capacidadeOptional = capacidadeRepository.findById(id);
		
		if (capacidadeOptional.isPresent()) {
			Capacidade capacidade = capacidadeOptional.get();
			capacidade.setDescricao(capacidadeDTO.getDescricao());
			capacidade.setTipo(capacidadeDTO.getTipo());
			capacidadeRepository.save(capacidade);
			return ResponseEntity.ok(new CapacidadeDTO(capacidade));
		} else {
			return ResponseEntity.notFound().build();
			
		}
			
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteCapacidade(@PathVariable Long id) {
		capacidadeRepository.deleteById(id);
	}
	


}
