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

import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.repository.SARepository;

@RestController
@RequestMapping("/sa")
public class SAResource {
	@Autowired
	private  SARepository saRepository;
	
	@GetMapping
	public Iterable<SA> findAll(){
		return saRepository.findAll();
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public SA findById(@PathVariable Long id) {
		return saRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaTitulo/{titulo}")
	public Iterable<SA> findByTitulo(@PathVariable String titulo){
		return saRepository.findByTitulo(titulo);
	}
	
	@GetMapping("/pesquisaTipo/{tipo}")
	public Iterable<SA> findByTipo(@PathVariable Integer tipo){
		return saRepository.findByTipo(tipo);
	}
	
	@PostMapping
	public SA createSA(@RequestBody SA sa) {
		return saRepository.save(sa);
	}
	
	@PutMapping("/update/{id}")
	public SA updateSA(@PathVariable Long id, @RequestBody SA sa) {
		sa.setId(id);
		return saRepository.save(sa);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteSA(@PathVariable Long id) {
		saRepository.deleteById(id);
	}
}
