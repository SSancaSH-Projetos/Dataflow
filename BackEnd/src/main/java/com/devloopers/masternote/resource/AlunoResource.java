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

import com.devloopers.masternote.dto.AlunoDTORequest;
import com.devloopers.masternote.dto.AlunoDTOResponse;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.repository.AlunoRepository;
import com.devloopers.masternote.repository.TurmaRepository;

import jakarta.persistence.EntityNotFoundException;





@RestController
@RequestMapping("/aluno")

public class AlunoResource {
	
	@Autowired
	private  AlunoRepository alunoRepository;
	@Autowired
	private TurmaRepository turmaRepository;

	
	@GetMapping
	public Iterable<AlunoDTOResponse> findAll(){
		Iterable<Aluno> alunos = alunoRepository.findAll();
		List<AlunoDTOResponse> alunosDTO = new ArrayList<>();
		for(Aluno aluno : alunos) {
			AlunoDTOResponse alunoDTO = AlunoDTOResponse.fromAluno(aluno);
			alunosDTO.add(alunoDTO);
		}
		return alunosDTO;
	}
	
	@GetMapping("/pesquisaNome/{nome}")
	public List<Aluno> findByNome(@PathVariable String nome){
		return alunoRepository.findByNome(nome);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AlunoDTOResponse findById(@PathVariable Long id) {
		Aluno aluno = alunoRepository.findById(id).get();
		AlunoDTOResponse alunoDTO = AlunoDTOResponse.fromAluno(aluno);
		return alunoDTO;
		
	}
	
	@GetMapping("/pesquisaNumeroChamada/{numeroChamada}")
	public List<Aluno> findByNumeroChamada(@PathVariable Integer numeroChamada) {
		return alunoRepository.findByNumeroChamada(numeroChamada);
	}
	
	@PostMapping
	public AlunoDTOResponse createAluno(@RequestBody AlunoDTOResponse alunoDTO) {
		Aluno aluno = Aluno.of(alunoDTO);
		
		Aluno savedAluno = alunoRepository.save(aluno);
		
		
		return AlunoDTOResponse.fromAluno(aluno);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AlunoDTOResponse> updateAluno(@PathVariable Long id, @RequestBody AlunoDTORequest alunoDTO) {
	    Optional<Aluno> alunoOptional = alunoRepository.findById(id);
	    
	    if (alunoOptional.isPresent()) {
	        Aluno aluno = alunoOptional.get();
	        aluno.setNumeroChamada(alunoDTO.getNumeroChamada());
	        aluno.setNome(alunoDTO.getNome());
	        aluno.setTurma(alunoDTO.getTurma());
	        alunoRepository.save(aluno);
	        return ResponseEntity.ok(AlunoDTOResponse.fromAluno(aluno));
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	
	@DeleteMapping("/delete/{id}")
	public void deleteAlunoDTO(@PathVariable Long id) {
		alunoRepository.deleteById(id);
	}
	

}
