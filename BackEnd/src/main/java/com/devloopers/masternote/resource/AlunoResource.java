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

import com.devloopers.masternote.dto.AlunoDTO;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.repository.AlunoRepository;





@RestController
@RequestMapping("/aluno")

public class AlunoResource {
	
	@Autowired
	private  AlunoRepository alunoRepository;

	
	@GetMapping
	public Iterable<AlunoDTO> findAll(){
		Iterable<Aluno> alunos = alunoRepository.findAll();
		List<AlunoDTO> alunosDTO = new ArrayList<>();
		for(Aluno aluno : alunos) {
			AlunoDTO alunoDTO = new AlunoDTO(aluno);
			alunosDTO.add(alunoDTO);
		}
		return alunosDTO;
	}
	
	@GetMapping("/pesquisaNome/{nome}")
	public List<Aluno> findByNome(@PathVariable String nome){
		return alunoRepository.findByNome(nome);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public AlunoDTO findById(@PathVariable Long id) {
		Aluno aluno = alunoRepository.findById(id).get();
		AlunoDTO alunoDTO = new AlunoDTO(aluno);
		return alunoDTO;
		
	}
	
	@GetMapping("/pesquisaNumeroChamada/{numeroChamada}")
	public List<Aluno> findByNumeroChamada(@PathVariable Integer numeroChamada) {
		return alunoRepository.findByNumeroChamada(numeroChamada);
	}
	
	@PostMapping
	public AlunoDTO createAluno(@RequestBody AlunoDTO alunoDTO) {
		Aluno aluno = Aluno.of(alunoDTO);
		return new AlunoDTO(alunoRepository.save(aluno));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<AlunoDTO> updateAluno(@PathVariable Long id, @RequestBody AlunoDTO alunoDTO) {
	    Optional<Aluno> alunoOptional = alunoRepository.findById(id);
	    
	    if (alunoOptional.isPresent()) {
	        Aluno aluno = alunoOptional.get();
	        aluno.setNumeroChamada(alunoDTO.getNumeroChamada());
	        aluno.setNome(alunoDTO.getNome());
	        aluno.setTurma(alunoDTO.getTurma());
	        alunoRepository.save(aluno);
	        return ResponseEntity.ok(new AlunoDTO(aluno));
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

	
	@DeleteMapping("/delete/{id}")
	public void deleteAlunoDTO(@PathVariable Long id) {
		alunoRepository.deleteById(id);
	}
	

}
