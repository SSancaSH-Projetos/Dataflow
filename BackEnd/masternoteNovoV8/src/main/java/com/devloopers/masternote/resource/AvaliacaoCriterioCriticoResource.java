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

import com.devloopers.masternote.dto.AvaliacaoCriterioCriticoDTO;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.AvaliacaoCriterioCritico;

import com.devloopers.masternote.repository.AvaliacaoCriterioCriticoRepository;



@RestController
@RequestMapping("/avaliacaoCriterioCritico")

public class AvaliacaoCriterioCriticoResource {

	@Autowired
	private  AvaliacaoCriterioCriticoRepository avaliacaoCriterioCriticoRepository;
	
	
	@GetMapping
	public Iterable<AvaliacaoCriterioCriticoDTO> findAll(){
		Iterable<AvaliacaoCriterioCritico> aCCs = avaliacaoCriterioCriticoRepository.findAll();
		List<AvaliacaoCriterioCriticoDTO> aCCsDTO = new ArrayList<>();
		for(AvaliacaoCriterioCritico aCC : aCCs) {
			AvaliacaoCriterioCriticoDTO aCCDTO = new AvaliacaoCriterioCriticoDTO(aCC);
			aCCsDTO.add(aCCDTO);
		}
		return aCCsDTO;
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AvaliacaoCriterioCriticoDTO findById(@PathVariable Long id) {
		AvaliacaoCriterioCritico aCC = avaliacaoCriterioCriticoRepository.findById(id).get();
		AvaliacaoCriterioCriticoDTO aCCDTO = new AvaliacaoCriterioCriticoDTO(aCC);
		return aCCDTO;
		
	}
	
	@GetMapping("/pesquisaAluno/{idAluno}")
	public Iterable<AvaliacaoCriterioCritico> findByAluno(@PathVariable Long idAluno){
		Aluno aluno = new Aluno();
	    aluno.setId(idAluno); // Configurando o ID do Aluno
	    return avaliacaoCriterioCriticoRepository.findByAluno(aluno);
		}
		
			
	@PostMapping
	public AvaliacaoCriterioCriticoDTO createAvaliacaoCriterioCritico(@RequestBody AvaliacaoCriterioCriticoDTO avaliacaoCriterioCriticoDTO) {
		AvaliacaoCriterioCritico aCC = AvaliacaoCriterioCritico.of(avaliacaoCriterioCriticoDTO);
		return new AvaliacaoCriterioCriticoDTO(avaliacaoCriterioCriticoRepository.save(aCC));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AvaliacaoCriterioCriticoDTO> updateAvaliacaoCriterioCritico(@PathVariable Long id, @RequestBody AvaliacaoCriterioCriticoDTO avaliacaoCriterioCriticoDTO) {
		Optional<AvaliacaoCriterioCritico> aCCOptional = avaliacaoCriterioCriticoRepository.findById(id);
		
		if(aCCOptional.isPresent()) {
			AvaliacaoCriterioCritico aCC = aCCOptional.get();
			aCC.setResultado(avaliacaoCriterioCriticoDTO.isResultado());
			return ResponseEntity.ok(new AvaliacaoCriterioCriticoDTO(aCC));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteAvaliacaoCriterioCritico(@PathVariable Long id) {
		avaliacaoCriterioCriticoRepository.deleteById(id);
	}
	
	
	
	
}
