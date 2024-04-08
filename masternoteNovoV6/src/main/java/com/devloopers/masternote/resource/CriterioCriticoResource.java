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

import com.devloopers.masternote.entity.CriterioCritico;
import com.devloopers.masternote.repository.CriterioCriticoRepository;

@RestController
@RequestMapping("/cc")
public class CriterioCriticoResource {
	
	@Autowired
	private  CriterioCriticoRepository criterioCriticoRepository;
	
	@GetMapping
	public Iterable<CriterioCritico> findAll(){
		return criterioCriticoRepository.findAll();
	}
		
	@GetMapping("/pesquisaId/{id}")
	public CriterioCritico findById(@PathVariable Long id) {
		return criterioCriticoRepository.findById(id).orElse(null);
	}
	
@PostMapping
	public CriterioCritico createCC(@RequestBody CriterioCritico cc) {
		return criterioCriticoRepository.save(cc);
	}
	
	@PutMapping("/update/{id}")
	public CriterioCritico updateCC(@PathVariable Long id, @RequestBody CriterioCritico cc) {
		cc.setId(id);
		return criterioCriticoRepository.save(cc);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteCC(@PathVariable Long id) {
		criterioCriticoRepository.deleteById(id);
	}

}

