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
import com.devloopers.masternote.entity.AvaliacaoCriterioCritico;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.repository.AvaliacaoCriterioCriticoRepository;



@RestController
@RequestMapping("/avaliacaoCriterioCritico")

public class AvaliacaoCriterioCriticoResource {

	@Autowired
	private  AvaliacaoCriterioCriticoRepository avaliacaoCriterioCriticoRepository;
	
	@GetMapping
	public Iterable<AvaliacaoCriterioCritico> findAll(){
		return avaliacaoCriterioCriticoRepository.findAll();
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AvaliacaoCriterioCritico findById(@PathVariable Long id) {
		return avaliacaoCriterioCriticoRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/pesquisaAluno/{idAluno}")
	public Iterable<AvaliacaoCriterioCritico> findByAluno(@RequestBody Aluno aluno){
		return avaliacaoCriterioCriticoRepository.findByAluno(aluno);
	}
	
	
	@PostMapping
	public AvaliacaoCriterioCritico createAvaliacaoCriterioCritico(@RequestBody AvaliacaoCriterioCritico avaliacaoCriterioCritico) {
		return avaliacaoCriterioCriticoRepository.save(avaliacaoCriterioCritico);
	}
	
	
	@PutMapping("/update/{id}")
	public AvaliacaoCriterioCritico updateAvaliacaoCriterioCritico(@PathVariable Long id, @RequestBody AvaliacaoCriterioCritico avaliacaoCriterioCritico) {
		avaliacaoCriterioCritico.setId(id);
		return avaliacaoCriterioCriticoRepository.save(avaliacaoCriterioCritico);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAvaliacaoCriterioCritico(@PathVariable Long id) {
		avaliacaoCriterioCriticoRepository.deleteById(id);
	}
	
	
	
	
}
