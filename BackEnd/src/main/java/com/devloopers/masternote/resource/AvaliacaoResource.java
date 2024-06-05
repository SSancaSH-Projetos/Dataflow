package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devloopers.masternote.dto.AvaliacaoDTORequest;
import com.devloopers.masternote.dto.AvaliacaoDTOResponse;
import com.devloopers.masternote.entity.Avaliacao;
import com.devloopers.masternote.entity.Curso;
import com.devloopers.masternote.entity.Turma;
import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.entity.Aluno;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.repository.AvaliacaoRepository;
import com.devloopers.masternote.repository.CursoRepository;
import com.devloopers.masternote.repository.TurmaRepository;
import com.devloopers.masternote.repository.UCRepository;
import com.devloopers.masternote.repository.AlunoRepository;
import com.devloopers.masternote.repository.CapacidadeRepository;
import com.devloopers.masternote.repository.CriterioRepository;
import com.devloopers.masternote.repository.SARepository;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoResource {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private UCRepository ucRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CapacidadeRepository capacidadeRepository;

    @Autowired
    private CriterioRepository criterioRepository;

    @Autowired
    private SARepository saRepository;

    @GetMapping
    public List<AvaliacaoDTOResponse> findAll() {
        List<Avaliacao> ava = avaliacaoRepository.findAll();
        return ava.stream()
                  .map(AvaliacaoDTOResponse::fromAvaliacao)
                  .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> createAvaliacao(@RequestBody List<AvaliacaoDTORequest> avaliacaoDTOs) {
        List<Avaliacao> avaliacoes = new ArrayList<>();
        for (AvaliacaoDTORequest avaliacaoDTO : avaliacaoDTOs) {
            // Verificação se a avaliação já existe
            Optional<Avaliacao> existingAvaliacao = avaliacaoRepository.findByAlunoIdAndCriterioId(
                    avaliacaoDTO.getAluno(), avaliacaoDTO.getCriterio());

            if (existingAvaliacao.isPresent()) {
                String errorMessage = "Avaliação já existe para o aluno e critério fornecidos.";
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
            }

            Avaliacao avaliacao = Avaliacao.of(avaliacaoDTO);

            Optional<Curso> curso = cursoRepository.findById(avaliacaoDTO.getCurso());
            Optional<Turma> turma = turmaRepository.findById(avaliacaoDTO.getTurma());
            Optional<UC> uc = ucRepository.findById(avaliacaoDTO.getUc());
            Optional<Aluno> aluno = alunoRepository.findById(avaliacaoDTO.getAluno());
            Optional<Capacidade> capacidade = capacidadeRepository.findById(avaliacaoDTO.getCapacidade());
            Optional<Criterio> criterio = criterioRepository.findById(avaliacaoDTO.getCriterio());
            Optional<SA> sa = saRepository.findById(avaliacaoDTO.getSa());

            if (curso.isPresent() && turma.isPresent() && uc.isPresent() && aluno.isPresent()
                    && capacidade.isPresent() && criterio.isPresent() && sa.isPresent()) {

                avaliacao.setCurso(curso.get());
                avaliacao.setTurma(turma.get());
                avaliacao.setUc(uc.get());
                avaliacao.setAluno(aluno.get());
                avaliacao.setCapacidade(capacidade.get());
                avaliacao.setCriterio(criterio.get());
                avaliacao.setSa(sa.get());

                avaliacoes.add(avaliacao);
            } else {
                String errorMessage = "Some associated entities were not found.";
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
            }
        }

        avaliacaoRepository.saveAll(avaliacoes);
        List<AvaliacaoDTOResponse> response = avaliacoes.stream()
                .map(AvaliacaoDTOResponse::fromAvaliacao)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/contarCriticosAtendidos/{alunoId}/{ucId}")
    public Long contarCriticosAtendidos(@PathVariable Long alunoId, @PathVariable Long ucId) {
        return avaliacaoRepository.countAtendeCriticoCriteriosByAlunoAndUc(alunoId, ucId);
    }
    
    @GetMapping("/contarCriticosNaoAtendidos/{alunoId}/{ucId}")
    public Long contarCriticosNaoAtendidos(@PathVariable Long alunoId, @PathVariable Long ucId) {
        return avaliacaoRepository.countNaoAtendeCriticoCriteriosByAlunoAndUc(alunoId, ucId);
    }
    
    
    @GetMapping("/contarDesejaveisAtendidos/{alunoId}/{ucId}")
    public Long contarDesejaveisAtendidos(@PathVariable Long alunoId, @PathVariable Long ucId) {
        return avaliacaoRepository.countAtendeDesejaveisByAlunoAndUc(alunoId, ucId);
    }
    
    @GetMapping("/contarDesejaveisNaoAtendidos/{alunoId}/{ucId}")
    public Long contarDesejaveisNaoAtendidos(@PathVariable Long alunoId, @PathVariable Long ucId) {
        return avaliacaoRepository.countNaoAtendeDesejaveisByAlunoAndUc(alunoId, ucId);
    }
    
    @GetMapping("/listarCriterioCriticoNaoAtendidoPorAlunoAndUc/{alunoId}/{ucId}")
    public ResponseEntity<List<Criterio>> getCriticoCriteriosNaoAtendidos(@PathVariable Long alunoId, @PathVariable Long ucId) {
        List<Criterio> criteriosCriticos = avaliacaoRepository.findNaoAtendidoCriticoCriteriosByAlunoAndUc(alunoId, ucId);
        return ResponseEntity.ok(criteriosCriticos);
    }

    @GetMapping("/listarCriterioDesejavelNaoAtendidoPorAlunoAndUc/{alunoId}/{ucId}")
    public ResponseEntity<List<Criterio>> getDesejavelCriteriosNaoAtendido(@PathVariable Long alunoId, @PathVariable Long ucId) {
        List<Criterio> criteriosDesejaveis = avaliacaoRepository.findNaoAtendidoDesejavelCriteriosByAlunoAndUc(alunoId, ucId);
        return ResponseEntity.ok(criteriosDesejaveis);
    }

    @GetMapping("/resultado/{ucId}/{capacidadeId}/{criterioId}/{alunoId}")
    public ResponseEntity<String> getResultado(@PathVariable  Long ucId, 
    											@PathVariable   Long capacidadeId, 
    											@PathVariable Long criterioId, 
    											@PathVariable Long alunoId) {
        String resultado = avaliacaoRepository.findResultadoByUcCapacidadeCriterioAluno(ucId, capacidadeId, criterioId, alunoId);
        return ResponseEntity.ok(resultado);
    }
    
    

    @DeleteMapping("/delete/{id}")
    public void deleteAvaliacao(@PathVariable Long id) {
        avaliacaoRepository.deleteById(id);
    }
}
