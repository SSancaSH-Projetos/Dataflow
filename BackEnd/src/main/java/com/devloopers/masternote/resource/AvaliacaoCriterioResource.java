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

import com.devloopers.masternote.dto.AvaliacaoCriterioDTO;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterio;

import com.devloopers.masternote.repository.AvaliacaoCriterioRepository;



@RestController
@RequestMapping("/avaliacaoCriterioCritico")

public class AvaliacaoCriterioResource {

	@Autowired
	private  AvaliacaoCriterioRepository avaliacaoCriterioCriticoRepository;
	
	
	@GetMapping
	public Iterable<AvaliacaoCriterioDTO> findAll(){
		Iterable<AvaliacaoCriterio> aCCs = avaliacaoCriterioCriticoRepository.findAll();
		List<AvaliacaoCriterioDTO> aCCsDTO = new ArrayList<>();
		for(AvaliacaoCriterio aCC : aCCs) {
			AvaliacaoCriterioDTO aCCDTO = new AvaliacaoCriterioDTO(aCC);
			aCCsDTO.add(aCCDTO);
		}
		return aCCsDTO;
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AvaliacaoCriterioDTO findById(@PathVariable Long id) {
		AvaliacaoCriterio aCC = avaliacaoCriterioCriticoRepository.findById(id).get();
		AvaliacaoCriterioDTO aCCDTO = new AvaliacaoCriterioDTO(aCC);
		return aCCDTO;
		
	}
	
	@GetMapping("/pesquisaAluno/{idAluno}")
	public Iterable<AvaliacaoCriterio> findByAluno(@PathVariable Long idAluno){
		Aluno aluno = new Aluno();
	    aluno.setId(idAluno); // Configurando o ID do Aluno
	    return avaliacaoCriterioCriticoRepository.findByAluno(aluno);
		}
		
			
	@PostMapping
	public AvaliacaoCriterioDTO createAvaliacaoCriterioCritico(@RequestBody AvaliacaoCriterioDTO avaliacaoCriterioCriticoDTO) {
		AvaliacaoCriterio aCC = AvaliacaoCriterio.of(avaliacaoCriterioCriticoDTO);
		return new AvaliacaoCriterioDTO(avaliacaoCriterioCriticoRepository.save(aCC));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AvaliacaoCriterioDTO> updateAvaliacaoCriterioCritico(@PathVariable Long id, @RequestBody AvaliacaoCriterioDTO avaliacaoCriterioCriticoDTO) {
		Optional<AvaliacaoCriterio> aCCOptional = avaliacaoCriterioCriticoRepository.findById(id);
		
		if(aCCOptional.isPresent()) {
			AvaliacaoCriterio aCC = aCCOptional.get();
			aCC.setResultado(avaliacaoCriterioCriticoDTO.isResultado());
			return ResponseEntity.ok(new AvaliacaoCriterioDTO(aCC));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAvaliacaoCriterioCritico(@PathVariable Long id) {
		avaliacaoCriterioCriticoRepository.deleteById(id);
	}
	
	
	
	
}
