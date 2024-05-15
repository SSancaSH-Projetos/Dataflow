package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.repository.CursoRepository;
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

	@Autowired
	private CursoRepository cursoRepository;

	@GetMapping
	public List<TurmaDTO> findAll() {
		List<Turma> turmas = turmaRepository.findAll();
		return turmas.stream()
				.map(TurmaDTO::fromTurma) // Usando o método fromTurma para transformar Turma em TurmaDTO
				.collect(Collectors.toList());
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public TurmaDTO findById(@PathVariable Long id) {
		Turma turma = turmaRepository.findById(id).get();
        return TurmaDTO.fromTurma(turma);
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<Turma> findBySigla(@PathVariable String sigla){
		return turmaRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public TurmaDTO createTurma(@RequestBody TurmaDTO turmaDTO) {
		Turma turma = Turma.of(turmaDTO);
		Optional<Curso> cursoDaTurma = cursoRepository.findById(turmaDTO.getCurso());
        cursoDaTurma.ifPresent(turma::setCurso);
		return TurmaDTO.fromTurma(turmaRepository.save(turma));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<TurmaDTO> updateTurma(@PathVariable Long id, @RequestBody TurmaDTO turmaDTO) {
		Optional<Turma> turmaOptional = turmaRepository.findById(id);
		
		if(turmaOptional.isPresent()) {
			Turma turma = turmaOptional.get();
			turma.setSigla(turmaDTO.getSigla());
			turmaRepository.save(turma);
			return ResponseEntity.ok(TurmaDTO.fromTurma(turma));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTurma(@PathVariable Long id) {
		turmaRepository.deleteById(id);
	}
}
