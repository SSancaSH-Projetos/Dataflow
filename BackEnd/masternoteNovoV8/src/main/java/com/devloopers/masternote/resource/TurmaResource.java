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

import com.devloopers.masternote.dto.TurmaDTO;
import com.devloopers.masternote.entity.Turma;
import com.devloopers.masternote.repository.TurmaRepository;



@RestController
@RequestMapping("/turma")
public class TurmaResource {
	
	@Autowired
	private  TurmaRepository turmaRepository;
	
	@GetMapping
	public Iterable<TurmaDTO> findAll(){
		Iterable<Turma> turmas = turmaRepository.findAll();
		List<TurmaDTO> turmasDTO = new ArrayList<>();
		for(Turma turma : turmas) {
			TurmaDTO turmaDTO = new TurmaDTO(turma);
			turmasDTO.add(turmaDTO);
		}
		
		return turmasDTO;
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public TurmaDTO findById(@PathVariable Long id) {
		Turma turma = turmaRepository.findById(id).get();
		TurmaDTO turmaDTO = new TurmaDTO(turma);
		return turmaDTO;
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<Turma> findBySigla(@PathVariable String sigla){
		return turmaRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public TurmaDTO createTurma(@RequestBody TurmaDTO turmaDTO) {
		Turma turma = Turma.of(turmaDTO);
		return new TurmaDTO(turmaRepository.save(turma));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<TurmaDTO> updateTurma(@PathVariable Long id, @RequestBody TurmaDTO turmaDTO) {
		Optional<Turma> turmaOptional = turmaRepository.findById(id);
		
		if(turmaOptional.isPresent()) {
			Turma turma = turmaOptional.get();
			turma.setSigla(turmaDTO.getSigla());
			turmaRepository.save(turma);
			return ResponseEntity.ok(new TurmaDTO(turma));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTurma(@PathVariable Long id) {
		turmaRepository.deleteById(id);
	}
}
