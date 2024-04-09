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
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.repository.AlunoRepository;



@RestController
@RequestMapping("/aluno")

public class AlunoResource {
	
	@Autowired
	private  AlunoRepository alunoRepository;

	
	@GetMapping
	public Iterable<Aluno> findAll(){
		return alunoRepository.findAll();
	}
	
	@GetMapping("/pesquisaNome/{nome}")
	public Iterable<Aluno> findByNome(@PathVariable String nome){
		return alunoRepository.findByNome(nome);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public Aluno findById(@PathVariable Long id) {
		return alunoRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaNumeroChamada/{numeroChamada}")
	public Iterable<Aluno> findByNumeroChamada(@PathVariable Integer numeroChamada) {
		return alunoRepository.findByNumeroChamada(numeroChamada);
	}
	
	@PostMapping
	public Aluno createAluno(@RequestBody Aluno aluno) {
		return alunoRepository.save(aluno);
	}
	
	@PutMapping("/update/{id}")
	public Aluno updateAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
		aluno.setId(id);
		return alunoRepository.save(aluno);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAluno(@PathVariable Long id) {
		alunoRepository.deleteById(id);
	}
	

}
