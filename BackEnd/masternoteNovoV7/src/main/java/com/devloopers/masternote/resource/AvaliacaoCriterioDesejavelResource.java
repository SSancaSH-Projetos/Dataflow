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
import com.devloopers.masternote.entity.AvaliacaoCriterioDesejavel;
import com.devloopers.masternote.repository.AvaliacaoCriterioDesejavelRepository;

@RestController
@RequestMapping("/avaliacaoCriterioDesejavel")

public class AvaliacaoCriterioDesejavelResource {

	@Autowired
	private  AvaliacaoCriterioDesejavelRepository avaliacaoCriterioDesejavelRepository;
	
	
	@GetMapping
	public Iterable<AvaliacaoCriterioDesejavel> findAll(){
		return avaliacaoCriterioDesejavelRepository.findAll();
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AvaliacaoCriterioDesejavel findById(@PathVariable Long id) {
		return avaliacaoCriterioDesejavelRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaAluno/{idAluno}")
	public Iterable<AvaliacaoCriterioDesejavel> findByAluno(@PathVariable Long idAluno){
		Aluno aluno = new Aluno();
	    aluno.setId(idAluno); 
	    return avaliacaoCriterioDesejavelRepository.findByAluno(aluno);
	}
		
	@PostMapping
	public AvaliacaoCriterioDesejavel createAvaliacaoCriterioDesejavel(@RequestBody AvaliacaoCriterioDesejavel avaliacaoCriterioDesejavel) {
		return avaliacaoCriterioDesejavelRepository.save(avaliacaoCriterioDesejavel);
	}
	
	@PutMapping("/update/{id}")
	public AvaliacaoCriterioDesejavel updateAvaliacaoCriterioDesejavel(@PathVariable Long id, @RequestBody AvaliacaoCriterioDesejavel avaliacaoCriterioDesejavel) {
		avaliacaoCriterioDesejavel.setId(id);
		return avaliacaoCriterioDesejavelRepository.save(avaliacaoCriterioDesejavel);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAvaliacaoCriterioDesejavel(@PathVariable Long id) {
		avaliacaoCriterioDesejavelRepository.deleteById(id);
	}
	
	
	
	
}
