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

import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.repository.UCRepository;


@RestController
@RequestMapping("/uc")
public class UCResource {
	@Autowired
	private  UCRepository ucRepository;
	
	@GetMapping
	public Iterable<UC> findAll(){
		return ucRepository.findAll();
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public UC findById(@PathVariable Long id) {
		return ucRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<UC> findBySigla(@PathVariable String sigla){
		return ucRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public UC createUC(@RequestBody UC uc) {
		return ucRepository.save(uc);
	}
	
	@PutMapping("/update/{id}")
	public UC updateUC(@PathVariable Long id, @RequestBody UC uc) {
		uc.setId(id);
		return ucRepository.save(uc);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUC(@PathVariable Long id) {
		ucRepository.deleteById(id);
	}

}
