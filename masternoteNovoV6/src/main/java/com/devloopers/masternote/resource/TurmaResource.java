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

import com.devloopers.masternote.entity.Turma;
import com.devloopers.masternote.repository.TurmaRepository;



@RestController
@RequestMapping("/turma")
public class TurmaResource {
	
	@Autowired
	private  TurmaRepository turmaRepository;
	
	@GetMapping
	public Iterable<Turma> findAll(){
		return turmaRepository.findAll();
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public Turma findById(@PathVariable Long id) {
		return turmaRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<Turma> findBySigla(@PathVariable String sigla){
		return turmaRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public Turma createTurma(@RequestBody Turma turma) {
		return turmaRepository.save(turma);
	}
	
	@PutMapping("/update/{id}")
	public Turma updateTurma(@PathVariable Long id, @RequestBody Turma turma) {
		turma.setId(id);
		return turmaRepository.save(turma);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTurma(@PathVariable Long id) {
		turmaRepository.deleteById(id);
	}
}
