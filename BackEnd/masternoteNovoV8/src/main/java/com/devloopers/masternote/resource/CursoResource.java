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

import com.devloopers.masternote.dto.CursoDTO;
import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.repository.CursoRepository;


@RestController
@RequestMapping("/curso")
public class CursoResource {

    @Autowired
    private CursoRepository cursoRepository;

    @GetMapping
    public Iterable<CursoDTO> findAll() {
        Iterable<Curso> cursos = cursoRepository.findAll();
        List<CursoDTO> cursosDTO = new ArrayList<>();
        for (Curso curso : cursos) {
            CursoDTO cursoDTO = new CursoDTO(curso);
            cursosDTO.add(cursoDTO);
        }
        return cursosDTO;
    }

    @GetMapping("/pesquisaNome/{nome}")
    public List<Curso> findByNome(@PathVariable String nome) {
        return cursoRepository.findByNome(nome);
    }

    @GetMapping("/pesquisaId/{id}")
    public CursoDTO findById(@PathVariable Long id) {
        Curso curso = cursoRepository.findById(id).orElse(null);
        return new CursoDTO(curso);
    }

    @PostMapping
    public CursoDTO createCurso(@RequestBody CursoDTO cursoDTO) {
        Curso curso = Curso.of(cursoDTO);
        return new CursoDTO(cursoRepository.save(curso));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CursoDTO> updateCurso(@PathVariable Long id, @RequestBody CursoDTO cursoDTO) {
        Optional<Curso> cursoOptional = cursoRepository.findById(id);

        if (cursoOptional.isPresent()) {
            Curso curso = cursoOptional.get();
            curso.setCargaHoraria(cursoDTO.getCargaHoraria());
            curso.setNivel(cursoDTO.getNivel());
            curso.setNome(cursoDTO.getNome());
            cursoRepository.save(curso);
            return ResponseEntity.ok(new CursoDTO(curso));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCurso(@PathVariable Long id) {
        cursoRepository.deleteById(id);
    }
}
