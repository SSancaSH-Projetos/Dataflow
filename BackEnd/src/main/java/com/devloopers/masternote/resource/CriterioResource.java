package com.devloopers.masternote.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devloopers.masternote.dto.CriterioDTORequest;
import com.devloopers.masternote.dto.CriterioDTOResponse;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.repository.CriterioRepository;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/criterio")
public class CriterioResource {
    
    @Autowired
    private CriterioRepository criterioRepository;

    // Não injetar DTOs como beans
    // @Autowired
    // private CriterioDTORequest criterioDTORequest;

    @GetMapping
    public List<CriterioDTOResponse> findAll() {
        List<Criterio> criterios = criterioRepository.findAll();
        return criterios.stream()
                .map(CriterioDTOResponse::fromCriterio)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriterioDTOResponse> findById(@PathVariable Long id) {
        Optional<Criterio> criterio = criterioRepository.findById(id);
        if (criterio.isPresent()) {
            return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(criterio.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CriterioDTOResponse> create(@RequestBody CriterioDTORequest criterioDTORequest) {
        Criterio criterio = new Criterio();
        criterio.setDescricao(criterioDTORequest.getDescricao());
        Criterio savedCriterio = criterioRepository.save(criterio);
        return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(savedCriterio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CriterioDTOResponse> update(@PathVariable Long id, @RequestBody CriterioDTORequest criterioDTORequest) {
        Optional<Criterio> optionalCriterio = criterioRepository.findById(id);
        if (optionalCriterio.isPresent()) {
            Criterio criterio = optionalCriterio.get();
            criterio.setDescricao(criterioDTORequest.getDescricao());
            criterioRepository.save(criterio);
            return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(criterio));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (criterioRepository.existsById(id)) {
            criterioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
