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
import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.repository.CursoRepository;

@RestController
@RequestMapping("/curso")
public class CursoResource {
	
	@Autowired
	private  CursoRepository cursoRepository;
	
	@GetMapping
	public Iterable<Curso> findAll(){
		return cursoRepository.findAll();
	}
	
	@GetMapping("/pesquisaNome/{nome}")
	public Iterable<Curso> findByNome(@PathVariable String nome){
		return cursoRepository.findByNome(nome);
	}
	
	@GetMapping("/pesquisaId/{id}")
	public Curso findById(@PathVariable Long id) {
		return cursoRepository.findById(id).orElse(null);
	}
	

	@PostMapping
	public Curso createCurso(@RequestBody Curso curso) {
		return cursoRepository.save(curso);
	}
	
	@PutMapping("/update/{id}")
	public Curso updateCurso(@PathVariable Long id, @RequestBody Curso curso) {
		curso.setId(id);
		return cursoRepository.save(curso);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteCurso(@PathVariable Long id) {
		cursoRepository.deleteById(id);
	}
}
