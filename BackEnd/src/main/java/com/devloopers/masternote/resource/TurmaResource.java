package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.devloopers.masternote.dto.TurmaDTOResponse;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.repository.AlunoRepository;
import com.devloopers.masternote.repository.CursoRepository;
import jakarta.persistence.EntityNotFoundException;
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

import com.devloopers.masternote.dto.TurmaDTORequest;
import com.devloopers.masternote.entity.Turma;
import com.devloopers.masternote.repository.TurmaRepository;



@RestController
@RequestMapping("/turma")
public class TurmaResource {
	
	@Autowired
	private  TurmaRepository turmaRepository;

	@Autowired
	private CursoRepository cursoRepository;

	@Autowired
	private AlunoRepository alunoRepository;

	@GetMapping
	public List<TurmaDTOResponse> findAll() {
		List<Turma> turmas = turmaRepository.findAll();
		return turmas.stream()
				.map(TurmaDTOResponse::fromTurma) // Usando o método fromTurma para transformar Turma em TurmaDTO
				.collect(Collectors.toList());
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public TurmaDTOResponse findById(@PathVariable Long id) {
		Turma turma = turmaRepository.findById(id).get();
        return TurmaDTOResponse.fromTurma(turma);
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<Turma> findBySigla(@PathVariable String sigla){
		return turmaRepository.findBySigla(sigla);
	}

	@PostMapping
	public TurmaDTOResponse createTurma(@RequestBody TurmaDTORequest turmaDTO) {
		Turma turma = Turma.of(turmaDTO);

		// Verifica e define o curso da turma
		cursoRepository.findById(turmaDTO.getCurso())
				.ifPresentOrElse(turma::setCurso, () -> {
					throw new EntityNotFoundException("Curso não encontrado com o ID: " + turmaDTO.getCurso());
				});

		// Verifica e adiciona os alunos à turma
		List<Aluno> alunosParaAdicionar = turmaDTO.getAlunosNaTurma().stream()
				.map(idAluno -> alunoRepository.findById(Long.parseLong(String.valueOf(idAluno))))
				.flatMap(Optional::stream)
				.collect(Collectors.toList());

		turma.setAlunos(alunosParaAdicionar);

		// Salva a turma no repositório
		Turma savedTurma = turmaRepository.save(turma);

		// Atualiza o atributo turma dos alunos para a turma recém-criada
		for (Aluno aluno : alunosParaAdicionar) {
			aluno.setTurma(savedTurma);
		}

		// Salva os alunos atualizados no repositório
		alunoRepository.saveAll(alunosParaAdicionar);

		// Retorna a resposta DTO
		return TurmaDTOResponse.fromTurma(savedTurma);
	}



	@PutMapping("/update/{id}")
	public ResponseEntity<TurmaDTOResponse> updateTurma(@PathVariable Long id, @RequestBody TurmaDTORequest turmaDTO) {
		Optional<Turma> turmaOptional = turmaRepository.findById(id);
		
		if(turmaOptional.isPresent()) {
			Turma turma = turmaOptional.get();
			turma.setSigla(turmaDTO.getSigla());
			turmaRepository.save(turma);
			return ResponseEntity.ok(TurmaDTOResponse.fromTurma(turma));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteTurma(@PathVariable Long id) {
		turmaRepository.deleteById(id);
	}
}
