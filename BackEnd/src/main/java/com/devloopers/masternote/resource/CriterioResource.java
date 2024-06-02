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
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CriterioDTORequest criterioDTORequest) {
        try {
            Optional<Criterio> optionalCriterio = criterioRepository.findById(id);
            if (optionalCriterio.isPresent()) {
                Criterio criterio = optionalCriterio.get();
                // Atualize os campos do objeto Criterio com base nos dados recebidos
                criterio.setDescricao(criterioDTORequest.getDescricao());
                criterio.setTipo(criterioDTORequest.getTipo());
                
                // Verifique se a capacidade foi modificada
                if (!Objects.equals(criterio.getCapacidade().getId(), criterioDTORequest.getCapId())) {
                    Optional<Capacidade> novaCapacidade = capacidadeRepository.findById(criterioDTORequest.getCapId());
                    if (novaCapacidade.isPresent()) {
                        criterio.setCapacidade(novaCapacidade.get());
                    } else {
                        // Retorne uma resposta de erro caso a nova capacidade não exista
                        return ResponseEntity.badRequest().body("Capacidade não encontrada com o ID fornecido.");
                    }
                }

                // Salve o objeto atualizado no banco de dados
                criterioRepository.save(criterio);

                // Retorne uma resposta de sucesso com os dados atualizados
                return ResponseEntity.ok(CriterioDTOResponse.fromCriterio(criterio));
            } else {
                // Se o critério não for encontrado, retorne uma resposta de não encontrado
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Se ocorrer uma exceção durante o processo, retorne uma resposta de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar o critério.");
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
