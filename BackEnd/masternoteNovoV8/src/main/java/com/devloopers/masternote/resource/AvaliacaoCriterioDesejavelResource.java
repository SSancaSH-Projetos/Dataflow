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

import com.devloopers.masternote.dto.AvaliacaoCriterioDesejavelDTO;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioDesejavel;
import com.devloopers.masternote.repository.AvaliacaoCriterioDesejavelRepository;

@RestController
@RequestMapping("/avaliacaoCriterioDesejavel")

public class AvaliacaoCriterioDesejavelResource {

	@Autowired
	private  AvaliacaoCriterioDesejavelRepository avaliacaoCriterioDesejavelRepository;
	
	
	@GetMapping
	public Iterable<AvaliacaoCriterioDesejavelDTO> findAll(){
		Iterable<AvaliacaoCriterioDesejavel> aCDs = avaliacaoCriterioDesejavelRepository.findAll();
		List<AvaliacaoCriterioDesejavelDTO> aCDsDTO = new ArrayList<>();
		for(AvaliacaoCriterioDesejavel aCD : aCDs) {
			AvaliacaoCriterioDesejavelDTO aCDDTO= new AvaliacaoCriterioDesejavelDTO(aCD);
			aCDsDTO.add(aCDDTO);
			
		}
		return aCDsDTO;
		
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AvaliacaoCriterioDesejavelDTO findById(@PathVariable Long id) {
		AvaliacaoCriterioDesejavel aCD = avaliacaoCriterioDesejavelRepository.findById(id).get();
		AvaliacaoCriterioDesejavelDTO aCDDTO = new AvaliacaoCriterioDesejavelDTO(aCD);
		return aCDDTO;
	}
	
	@GetMapping("/pesquisaAluno/{idAluno}")
	public Iterable<AvaliacaoCriterioDesejavel> findByAluno(@PathVariable Long idAluno){
		Aluno aluno = new Aluno();
	    aluno.setId(idAluno); 
	    return avaliacaoCriterioDesejavelRepository.findByAluno(aluno);
	}
		
	@PostMapping
	public AvaliacaoCriterioDesejavelDTO createAvaliacaoCriterioDesejavel(@RequestBody AvaliacaoCriterioDesejavelDTO avaliacaoCriterioDesejavelDTO) {
		AvaliacaoCriterioDesejavel aCD = AvaliacaoCriterioDesejavel.of(avaliacaoCriterioDesejavelDTO);
		return new AvaliacaoCriterioDesejavelDTO(avaliacaoCriterioDesejavelRepository.save(aCD));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AvaliacaoCriterioDesejavelDTO> updateAvaliacaoCriterioDesejavel(@PathVariable Long id, @RequestBody AvaliacaoCriterioDesejavelDTO avaliacaoCriterioDesejavelDTO) {
		Optional<AvaliacaoCriterioDesejavel> aCDOpitional = avaliacaoCriterioDesejavelRepository.findById(id);
		
		if(aCDOpitional.isPresent()) {
			AvaliacaoCriterioDesejavel aCD = aCDOpitional.get();
			aCD.setResultado(avaliacaoCriterioDesejavelDTO.isResultado());
			avaliacaoCriterioDesejavelRepository.save(aCD);
			return ResponseEntity.ok(new AvaliacaoCriterioDesejavelDTO(aCD));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAvaliacaoCriterioDesejavel(@PathVariable Long id) {
		avaliacaoCriterioDesejavelRepository.deleteById(id);
	}
	
	
	
	
}
