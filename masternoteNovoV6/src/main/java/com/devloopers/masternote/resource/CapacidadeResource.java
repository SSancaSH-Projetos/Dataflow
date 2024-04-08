package com.devloopers.masternote.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.repository.CapacidadeRepository;

@RestController
@RequestMapping("/capacidade")

public class CapacidadeResource {
	
	@Autowired
	private  CapacidadeRepository capacidadeRepository;
	
	@GetMapping
	public Iterable<Capacidade> findAll(){
		return capacidadeRepository.findAll();
	}
	
	@GetMapping("/pesquisaTipo/{tipo}")
	public Iterable<Capacidade> findByTipo(@PathVariable String tipo){
		return capacidadeRepository.findByTipo(tipo);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public Capacidade findById(@PathVariable Long id) {
		return capacidadeRepository.findById(id).orElse(null);
	}
	
	@PostMapping
	public Capacidade createCapacidade(@RequestBody Capacidade capacidade) {
		return capacidadeRepository.save(capacidade);
	}
	
	@PutMapping("/update/{id}")
	public Capacidade updateCapacidade(@PathVariable Long id, @RequestBody Capacidade capacidade) {
		capacidade.setId(id);
		return capacidadeRepository.save(capacidade);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteCapacidade(@PathVariable Long id) {
		capacidadeRepository.deleteById(id);
	}
	


}
