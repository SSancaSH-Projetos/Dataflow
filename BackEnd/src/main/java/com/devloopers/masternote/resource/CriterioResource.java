package com.devloopers.masternote.resource;

import com.devloopers.masternote.dto.CapacidadeDTOResponse;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.repository.CapacidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devloopers.masternote.dto.CriterioDTORequest;
import com.devloopers.masternote.dto.CriterioDTOResponse;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.repository.CriterioRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/criterio")
public class CriterioResource {
    
    @Autowired
    private CriterioRepository criterioRepository;
    @Autowired
    private CapacidadeRepository capacidadeRepository;
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

    @GetMapping("/pesquisaId/{id}")
    public CriterioDTOResponse findById(@PathVariable Long id) {
        Criterio criterio = criterioRepository.findById(id).get();
        return CriterioDTOResponse.fromCriterio(criterio);
    }

    @PostMapping
    public ResponseEntity<?> createCriterio(@RequestBody CriterioDTORequest criterioDTO) {

        Criterio c = Criterio.of(criterioDTO);

        Optional<Capacidade> capRecebido = capacidadeRepository.findById(criterioDTO.getCapId());
        if (capRecebido.isPresent()) {
            c.setCapacidade(capRecebido.get());
            criterioRepository.save(c);
            return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(c));
        } else {
            // Crie uma mensagem de erro ou objeto de erro adequado
            String errorMessage = "Capacidade not found with id: " + criterioDTO.getCapId();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CriterioDTOResponse> update(@PathVariable Long id, @RequestBody CriterioDTORequest criterioDTORequest) {
        Optional<Criterio> optionalCriterio = criterioRepository.findById(id);
        if (optionalCriterio.isPresent()) {
            Criterio criterio = optionalCriterio.get();
            System.out.println(criterio);
            Capacidade capacidade = new Capacidade();
            capacidade.setId(criterioDTORequest.getCapId());
            if(!Objects.equals(criterio.getCapacidade().getId(), criterioDTORequest.getCapId())){
                Optional<Capacidade> novaCapacidade = capacidadeRepository.findById(criterioDTORequest.getCapId());
                novaCapacidade.ifPresent(criterio::setCapacidade);
            }
            criterio.setTipo(criterioDTORequest.getTipo());
            criterio.setDescricao(criterioDTORequest.getDescricao());
            criterioRepository.save(criterio);

            return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(criterio));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/contagemDeCriteriosCriticosPorCapacidade/{capacidadeId}")
    public ResponseEntity<Long> countCriteriosCriticosByCapacidadeId(@PathVariable Long capacidadeId) {
        long count = criterioRepository.countCriteriosCriticosByCapacidadeId(capacidadeId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (criterioRepository.existsById(id)) {
            criterioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
