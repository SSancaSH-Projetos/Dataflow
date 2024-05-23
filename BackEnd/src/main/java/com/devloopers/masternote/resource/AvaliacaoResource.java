package com.devloopers.masternote.resource;

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
    public ResponseEntity<?> createAvaliacao(@RequestBody AvaliacaoDTORequest avaliacaoDTO) {
        Avaliacao avaliacao = Avaliacao.of(avaliacaoDTO);

        Optional<Curso> curso = cursoRepository.findById(avaliacaoDTO.getCurso().getId());
        Optional<Turma> turma = turmaRepository.findById(avaliacaoDTO.getTurma().getId());
        Optional<UC> uc = ucRepository.findById(avaliacaoDTO.getUc().getId());
        Optional<Aluno> aluno = alunoRepository.findById(avaliacaoDTO.getAluno().getId());
        Optional<Capacidade> capacidade = capacidadeRepository.findById(avaliacaoDTO.getCapacidade().getId());
        Optional<Criterio> criterio = criterioRepository.findById(avaliacaoDTO.getCriterio().getId());
        Optional<SA> sa = saRepository.findById(avaliacaoDTO.getSa().getId());

        if (curso.isPresent() && turma.isPresent() && uc.isPresent() && aluno.isPresent() 
            && capacidade.isPresent() && criterio.isPresent() && sa.isPresent()) {

            avaliacao.setCurso(curso.get());
            avaliacao.setTurma(turma.get());
            avaliacao.setUc(uc.get());
            avaliacao.setAluno(aluno.get());
            avaliacao.setCapacidade(capacidade.get());
            avaliacao.setCriterio(criterio.get());
            avaliacao.setSa(sa.get());

            avaliacaoRepository.save(avaliacao);
            return ResponseEntity.ok(AvaliacaoDTOResponse.fromAvaliacao(avaliacao));
        } else {
            String errorMessage = "Some associated entities were not found.";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }
    
    @GetMapping("/contarDesejavel")
    public long countCriteriosWithDInTipo() {
        return criterioRepository.countByTipoContainingD();
    }
    
    @GetMapping("/contarCritico")
    public long countByTipoContainingC() {
        return criterioRepository.countByTipoContainingC();
    }

    @GetMapping("/contarResultadoSCriterioCDoAluno/{id}")
    public long countByTipoContainingSCriterioC(Long id) {
        return avaliacaoRepository.countByResultadoSAndCriterioTipoCAndAlunoId(id);
    }

    @GetMapping("/contarResultadoSCriterioD")
    public long countByTipoContainingSCriterioD() {
        return avaliacaoRepository.countByResultadoSAndCriterioTipoD();
    }


    @DeleteMapping("/delete/{id}")
    public void deleteAvaliacao(@PathVariable Long id) {
        avaliacaoRepository.deleteById(id);
    }
}
